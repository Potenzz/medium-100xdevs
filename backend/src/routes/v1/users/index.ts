import { Hono } from 'hono';
import { PrismaClient} from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import { decode, verify, sign } from 'hono/jwt';
import { typeEnv } from "..//..//..//types//hono"
import bcrypt from 'bcrypt';
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

    const user = await prisma.user.create({
      data:{
        email : email,
        password : hashedPassword,
        name: name || null,
      },
    });

    const token = await sign({id:user.id}, c.env.JWT_SECRET);

    return c.json({
      jwt:token,
      message:"User Created Successfully!"})

  }catch (error: any) {
    console.error('Signup error:', error);

    if (error.code === 'P2002') {
      // Prisma unique constraint error (e.g., email already exists)
      return c.json({ error: 'Email is already taken' }, 400);
    }
    return c.json({ error: 'Internal server error' }, 500);
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

    // Try to find the user in the database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Validate password
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return c.json({ error: 'Invalid email or password' }, 403);
    }

    // Generate JWT token
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({
      jwt: token,
      message: 'Signin successful!',
    });
  }catch (error: any) {
    console.error('Signin error:', error);

    if (error.code === 'P2002') {
      // Prisma unique constraint error (e.g., email not found)
      return c.json({ error: 'Email not found' }, 404);
    }

    return c.json({ error: 'Internal server error' }, 500);
  }
})

export default userRoutes;
