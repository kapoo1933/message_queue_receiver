import http from 'http';
import { MongoClient } from 'mongodb';
import type { THandlerFunction } from '@types';
import { HttpMethod } from '@enums';

interface IMessage {
  send_time: Date;
  content: Record<string, unknown>;
}

interface ISubscriber {
  id: string;
  host: string;
  path: string;
}

interface IHandler {
  method: HttpMethod;
  path: string;
  handler: THandlerFunction;
}

interface IRouter {
  start_routing(request: http.IncomingMessage, response: http.ServerResponse): void;
}

interface IService {
  start(port: string, message_queue: IMessage[], db_client: MongoClient): void;
}

interface IHttpResponseHandler {
  respond(message?: string): void;
}

interface IErrorLog {
  time: Date;
  error: string;
  location: string;
}

interface IErrorHandler {
  dispatch_error(error: Error, location: string): void;
}

export { IMessage, ISubscriber, IRouter, IHandler, IService, IHttpResponseHandler, IErrorLog, IErrorHandler };