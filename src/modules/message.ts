import type { IMessage } from "@interfaces";

class Message implements IMessage {
  #send_time: Date;
  #content: Record<string, unknown>;

  constructor(send_time: Date, content: Record<string, unknown>) {
    this.#send_time = send_time;
    this.#content = content;
  }

  get send_time(): Date {
    return this.#send_time;
  }

  get content(): Record<string, unknown> {
    return this.#content;
  }
}

export { Message };