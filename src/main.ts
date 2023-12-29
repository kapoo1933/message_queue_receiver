// This message queue service is used to manage all suscribed servers and
// pushes new messages to all subcribers in the queue
import http from 'http';
import 'dotenv/config';
import { Service } from '@modules/service';
import { router, message_queue, db_client } from '@instances';

const PORT = process.env.PORT as string;
const server = http.createServer();
const service = new Service(router, server);

service.start(PORT, message_queue, db_client);