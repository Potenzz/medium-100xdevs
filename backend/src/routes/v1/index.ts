import { Hono } from 'hono';
import userRoutes from './users/index';
import blogRoutes from './blogs/index';

const v1Routes = new Hono();

v1Routes.route('/users', userRoutes);
v1Routes.route('/blogs', blogRoutes);

export default v1Routes;
