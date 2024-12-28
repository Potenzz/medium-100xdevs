import { Hono } from 'hono';
import v1Routes from './routes/v1/index';
import { cors } from 'hono/cors';

const app = new Hono();


app.use("*", cors());
app.route('/api/v1', v1Routes);

export default app;
