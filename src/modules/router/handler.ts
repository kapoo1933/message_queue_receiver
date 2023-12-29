import { HttpMethod } from "@enums";
import { IHandler } from "@interfaces";
import { THandlerFunction } from "@types";

class Handler implements IHandler {
  #method: HttpMethod;
  #path: string;
  #handler: THandlerFunction;

  constructor(method: HttpMethod, path: string, handler: THandlerFunction) {
    this.#method = method;
    this.#path = path;
    this.#handler = handler;
  }

  get method() {
    return this.#method;
  }

  get path() {
    return this.#path;
  }

  get handler() {
    return this.#handler;
  }
};


export { Handler };