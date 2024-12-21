import { Context } from 'hono';

export const errorHandler = async (c: Context, next: () => Promise<void>) => {
  try {
    await next(); // Execute the next middleware or route handler
  } catch (error: any) {
    console.error('Error occurred:', error);

    c.status(500); 
    return c.json({
      error: error.message || 'Internal Server Error',
    }); 
  }
};
