import type { IErrorLog, IErrorHandler } from '@interfaces';

class ErrorHandler implements IErrorHandler {
  #error_logs: IErrorLog[] = [];
  
  dispatch_error(error: Error, location: string): void {
    const error_log: IErrorLog = {
      time: new Date(),
      error: error.message,
      location: location,
    };
    this.#error_logs.push(error_log);
  }
}

export { ErrorHandler };