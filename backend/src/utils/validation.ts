import { z } from 'zod';

// Signup validation schema
export const signupSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long"), // not keeping password strong here, as easy to use website.
  name: z.string().optional(),
});

// Signin validation schema
export const signinSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string(),
});


// BlogSchma - Post
export const blogSchema = z.object({
  title:z.string(),
  content:z.string()
})

// BlogSchema - Put
export const blogSchemaPut = z.object({
  blogId:z.string(),
  title:z.string().optional(),
  content:z.string().optional()
})