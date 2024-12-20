import { MiddlewareHandler } from 'hono';
import { verify } from '@tsndr/cloudflare-worker-jwt'; // Install this library

const jwtAuth: MiddlewareHandler = async (c, next) => {
  const token = c.req.headers.get('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return c.json({ error: 'Unauthorized: Token is missing' }, 401);
  }

  try {
    const isValid = await verify(token, 'YOUR_SECRET_KEY'); // Replace with your secret key

    if (!isValid) {
      return c.json({ error: 'Unauthorized: Invalid token' }, 401);
    }

    const payload = await verify(token, 'YOUR_SECRET_KEY', true); // Decode token
    c.set('user', payload); // Attach the payload to the context for use in routes

    await next();
  } catch (err) {
    return c.json({ error: 'Unauthorized: Invalid token' }, 401);
  }
};

export default jwtAuth;
