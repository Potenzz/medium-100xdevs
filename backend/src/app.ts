import { Hono } from 'hono';
import v1Routes from './routes/v1/index';
import { errorHandler } from './middlewares/errorHandler';

const app = new Hono();

app.use('*', errorHandler);

app.route('/api/v1', v1Routes);

export default app;
