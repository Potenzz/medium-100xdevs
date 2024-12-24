import { Hono } from 'hono';
import { PrismaClient} from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
import { typeEnv } from "..//..//..//types//hono"

import bcrypt from 'bcryptjs';
import { signupSchema, signinSchema } from '../../../utils/validation';

const userRoutes = new Hono<{ Bindings: typeEnv }>();  

// SIGN UP        
userRoutes.post('/signup', async (c) => {

  try{

    const prisma = new PrismaClient({
      datasourceUrl : c.env.DATABASE_URL_CPOOL
    }).$extends(withAccelerate());

    const body = await c.req.json();

    // Validate input using Zod
    const validatedData = signupSchema.safeParse(body);
    if (!validatedData.success) {
      return c.json({ error: validatedData.error.format() }, 400);
    }
    const { email, password, name } = validatedData.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await prisma.user.create({
        data: {
          email: email,
          password: hashedPassword,
          name: name || null,
        },  
      });

      const token = await sign({id:user.id}, c.env.JWT_SECRET);

      return c.json({
        jwt:token,
        message:"User Created Successfully!"})
    } catch (prismaError: any) {
      // Handle Prisma unique constraint error
      if (prismaError.code === "P2002" && prismaError.meta?.target?.includes("email")) {
        return c.json({ error: "Email is already taken" }, 400);
      }
      // Re-throw unexpected errors
      throw prismaError;
    }
    

  } catch (error: any) {
    console.error("Unexpected error during signup:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});


//SIGN IN
userRoutes.post('/signin', async (c)=>{

  try{
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL_CPOOL
    }).$extends(withAccelerate());

    const body = await c.req.json();

    // Validate input using Zod
    const validatedData = signinSchema.safeParse(body);
    if (!validatedData.success) {
      return c.json({ error: validatedData.error.format() }, 400);
    }

    const { email, password } = validatedData.data;

    try {
      // Try to find the user in the database
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        // Invalid email or password
        return c.json({ error: "Invalid email or password" }, 403);
      }

      // Generate JWT token
      const token = await sign({ id: user.id }, c.env.JWT_SECRET);

      return c.json({
        jwt: token,
        message: "Signin successful!",
      });
    } catch (prismaError: any) {
      // Handle unexpected Prisma errors (e.g., findUnique failing unexpectedly)
      console.error("Unexpected database error during signin:", prismaError);
      return c.json({ error: "Internal database error" }, 500);
    }
  } catch (error: any) {
    console.error("Unexpected error during signin:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});


export default userRoutes;
