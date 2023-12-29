import http from 'http';
import { Db, Collection } from 'mongodb';
import 'dotenv/config';
import type { IHandler, IHttpResponseHandler, IMessage } from '@interfaces';
import { Handler, HttpResponseHandler, Message } from '@modules';
import { HttpMethod, HttpStatusCode } from '@enums';
import { message_queue } from './message_queue';
import { db_client } from './db_client';

const DB_NAME: string = process.env.DB_NAME;
const DB_COLLECTION: string = process.env.DB_COLLECTION;
const DB: Db = db_client.db(DB_NAME);
const COLLECTION: Collection = DB.collection(DB_COLLECTION);

const handlers: IHandler[] = [
  new Handler(HttpMethod.GET, '/queue', (payload: string[] = [], response: http.ServerResponse) => {
    let messages: IMessage[] = [];
    if (message_queue.length > 0) {
      for (const m of message_queue) {
        const message = { send_time: m.send_time, content: m.content };
        messages.push(message);
      }
    }
    const res = new HttpResponseHandler(HttpStatusCode.OK, response, { 'Content-Type': 'application/json' });
    res.respond(JSON.stringify(messages));
  }),

  new Handler(HttpMethod.POST, '/push', (payload: string[] = [], response: http.ServerResponse) => {
    let res: IHttpResponseHandler;
    if (payload.length > 0) {
      const { send_time, content } = JSON.parse(payload[0]);
      const message = new Message(send_time, content);
      message_queue.push(message);
      COLLECTION.insertOne(content);
      res = new HttpResponseHandler(HttpStatusCode.NO_CONTENT, response, { 'Content-Type': 'application/json' });
    } else {
      res = new HttpResponseHandler(HttpStatusCode.BAD_REQUEST, response, { 'Content-Type': 'application/json' });
    }
    res.respond();
  }),
];

export { handlers };