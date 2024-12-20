import { Hono } from 'hono';

const blogRoutes = new Hono();

// Create blog
blogRoutes.post('/blog', (c)=>{
  return c.json({message:`test`})
});

// Update blog
blogRoutes.put('/blog', (c)=>{
  return c.json({message:`test`})
})

// Get blogs
blogRoutes.get('/blog:id', (c)=>{
  return c.json({message:`test`})
})


export default blogRoutes;
