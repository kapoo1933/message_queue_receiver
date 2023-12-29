import http from 'http';
type THandlerFunction = (payload: string[], response: http.ServerResponse) => void;

export { THandlerFunction };