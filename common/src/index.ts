import { TypeOf, z } from 'zod';

// Signup validation schema
export const signupSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long"), // not keeping password strong here, as easy to use website.
  name: z.string().optional(),
});

export type SignupSchema = z.infer<typeof signupSchema>;

// Signin validation schema
export const signinSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string(),
});
export type SigninSchema = z.infer<typeof signinSchema>;

// BlogSchma - Post
export const blogSchemaCreate = z.object({
  title:z.string(),
  content:z.string()
})
export type BlogSchema = z.infer<typeof blogSchemaCreate>

// BlogSchema - Put
export const blogSchemaUpdate = z.object({
  blogId:z.string(),
  title:z.string().optional(),
  content:z.string().optional()
})

export type BlogSchemaPut = z.infer<typeof blogSchemaUpdate>