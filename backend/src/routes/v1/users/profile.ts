import { Hono } from 'hono';

const profileRoutes = new Hono();

profileRoutes.get('/', (c) => c.json({ message: 'User profile' }));
profileRoutes.put('/', (c) => c.json({ message: 'Update user profile' }));

export default profileRoutes;
