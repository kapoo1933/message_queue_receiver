import http from 'http';
import 'dotenv/config';
import { MongoClient } from 'mongodb';
import type { IService, IRouter, IMessage } from '@interfaces';

const DB_NAME = process.env.DB_NAME;

class Service implements IService {
  #router: IRouter;
  #server: http.Server;

  constructor(router: IRouter, server: http.Server) {
    this.#router = router;
    this.#server = server;
  }

  #dispatch_message(message_queue: IMessage[]) {
    setInterval(() => {
      if (message_queue.length > 0) {
        // send message to message queue broadcaster
      }
    }, 300)
  }
  /**
   * 
   * @param db_client - database client
   */
  async #establish_db_connection(db_client: MongoClient) {
    try {
      await db_client.connect();
      await db_client.db(DB_NAME).command({ ping: 1 });
      console.log(`Pinged your deployment. You successfully connected to DB: ${DB_NAME}`);
    } catch (error) {
      console.error(error);
      await db_client.close();
      console.log(`Closed connection to DB: ${DB_NAME}`);
    }
  }
  /**
   * 
   * @param port - port to listen on
   * @param message_queue - revieved messages from clients
   */
  async start(port: string, message_queue: IMessage[], db_client: MongoClient) {
    await this.#establish_db_connection(db_client);
    this.#server.on('request', (req, res) => {
      this.#router.start_routing(req, res);
    });
    // this.#dispatch_message(message_queue);
    this.#server.listen(port);
    console.log(`Server listening on port ${port}`);
  }
}

export { Service };
