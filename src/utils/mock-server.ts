import { setupServer } from 'msw/node';
import handlers from './mock-handlers';

const server = setupServer(...handlers);

export default server;
