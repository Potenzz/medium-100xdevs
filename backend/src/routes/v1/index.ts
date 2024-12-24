import { Hono } from 'hono';
import userRoutes from './users/index';
import blogRoutes from './blogs/index';
import { authMiddleware } from '../../middlewares/authMiddleware';

const v1Routes = new Hono();

v1Routes.route('/users', userRoutes);

blogRoutes.use('*', authMiddleware); 
v1Routes.route('/blogs', blogRoutes);

export default v1Routes;
