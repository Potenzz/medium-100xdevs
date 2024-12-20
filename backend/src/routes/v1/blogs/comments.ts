import { Hono } from 'hono';

const commentRoutes = new Hono();

commentRoutes.get('/:blogId/comments', (c) => {
  const blogId = c.req.param('blogId');
  return c.json({ message: `Comments for blog ${blogId}` });
});

export default commentRoutes;
