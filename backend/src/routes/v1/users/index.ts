import { Hono } from 'hono';
import { PrismaClient} from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

import { DATABASE_URL_Env } from "..//..//..//types//hono"

const userRoutes = new Hono<{ Bindings: DATABASE_URL_Env }>();  




userRoutes.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL_CPOOL
  }).$extends(withAccelerate());

  const body = await c.req.json();

  await prisma.user.create({
    data:{
      email : body.email,
      password : body.password,
    }
  })

  return c.json({message:"User Created Successfully!"})


})

userRoutes.post('/signin', (c)=>{
  return c.json({message:"test"})
})

export default userRoutes;
