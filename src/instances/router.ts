import { IRouter } from '@interfaces';
import { Router } from '@modules';
import { handlers } from './handlers';

const router: IRouter = new Router(handlers);

export { router };