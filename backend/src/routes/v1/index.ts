import { Hono } from 'hono';
import userRoutes from './users/index';
import profileRoutes from './users/profile';
import blogRoutes from './blogs/index';
import commentRoutes from './blogs/comments';

const v1Routes = new Hono();

v1Routes.route('/users', userRoutes);
v1Routes.route('/users/profile', profileRoutes);
v1Routes.route('/blogs', blogRoutes);
v1Routes.route('/blogs/comments', commentRoutes);

export default v1Routes;
