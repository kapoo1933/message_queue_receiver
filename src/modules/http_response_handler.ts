import type { IHttpResponseHandler } from "@interfaces";
import http from "http";
import { HttpStatusCode } from "@enums";

class HttpResponseHandler implements IHttpResponseHandler {
  #status_code: HttpStatusCode;
  #response: http.ServerResponse;
  #headers: { [key: string]: string } = {};
  constructor(status_code: HttpStatusCode, response: http.ServerResponse, headers: { [key: string]: string } = {}) {
    this.#status_code = status_code;
    this.#response = response;
    this.#headers = headers;
  }

  respond(message?: string) {
    this.#response.writeHead(this.#status_code, this.#headers);
    if (message) this.#response.write(message);
    this.#response.end();
  }
}

export { HttpResponseHandler };