# Medium 

A application where users can post blogs.

## Stack used in this projects are

- 1. React for the frontend.
- 2. Cloudflare workers in the backend.
- 3. zod as validation library, type inference for the frontend types
- 4. Typescript as the language.
- 5. Prisma as the ORM.
- 6. Postgres as the database. 
- 7. Connection pooling with Prisma-Accelerate for cloudflare workers.
- 8. jwt for the authentication (cookies approach as well)
- 9. HONO library for cloudflare workers.


## Features of the projects:

- 1. Users can signup/signin. 
- 2. Users can post blogs, 
- 3. Can perform CRUD operations. Create, Read, Update, Delete the blogs.
- 4. ...


## The Backend Routes
- POST /api/v1/users/signup
- POST /api/v1/users/signin
- POST /api/v1/blogs
- PUT /api/v1/blogs
- GET /api/v1/blogs:id
- GET /api/v1/blogs/bulk