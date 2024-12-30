import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { blogSchemaCreate, blogSchemaUpdate} from '@potenz/medium-common';
import { authMiddleware } from '../../../middlewares/authMiddleware';


const blogRoutes = new Hono<{
  Bindings:{
    DATABASE_URL_CPOOL:string
  },
  Variables : {
    UserId:string
  }
}>();

blogRoutes.use(authMiddleware);

// Create blog
blogRoutes.post('/blog', async (c)=>{
  try{
    const authorId = c.get("UserId");

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL_CPOOL
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const validatedData = blogSchemaCreate.safeParse(body);
    if(!validatedData.success){
      return c.json({error: validatedData.error.format}, 400);
    };

    const {title, content} = validatedData.data;

    try{
      const blog = await prisma.post.create({
        data:{
          title:title,
          content:content, 
          authorId:authorId,
          publishedAt: new Date(), 
        },
      });

      return c.json({blogId: blog.id,  message:"Blog Posted"}, 200)
    }catch (prismaError: any) {
      if (prismaError.code === "P2003") {
        // Handle foreign key constraint violation
        return c.json({ error: "Invalid authorId or related data" }, 400);
      }
      // Log and rethrow for unexpected errors
      console.error("Prisma error during blog creation:", prismaError);
      throw prismaError;
    }
  } catch (error: any) {
    console.error("Unexpected error during signup:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Update blog
blogRoutes.put('/blog',async (c)=>{
  try{
    const authorId = c.get("UserId");

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL_CPOOL
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const validatedData = blogSchemaUpdate.safeParse(body);
    if(!validatedData.success){
      return c.json({error: validatedData.error.format}, 400);
    };

    const { blogId, title, content } = validatedData.data;

    // Build the data object dynamically
    const updateData: { title?: string; content?: string } = {};
    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;

    if (Object.keys(updateData).length === 0) {
      return c.json({ error: "No data provided to update" }, 400);
    }

    try{
      // Perform update operation
      const updatedBlog = await prisma.post.update({
        where: { id:blogId },
        data: updateData,
      });

      return c.json({ blogId: updatedBlog.id, message: "Blog updated successfully" }, 200);

    }catch (prismaError: any) {
      if (prismaError.code === "P2003") {
        // Handle foreign key constraint violation
        return c.json({ error: "Invalid authorId or related data" }, 400);
      } else if (prismaError.code === "P2025") {
        // Handle record not found for an update/delete
        return c.json({ error: "Record not found" }, 404);
      }

      // Log and rethrow for unexpected errors
      console.error("Prisma error during blog updation:", prismaError);
      throw prismaError;
    }
  } catch (error: any) {
    console.error("Unexpected error during signup:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get all blogs with pagination
blogRoutes.get('/bulk', async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL_CPOOL,
    }).$extends(withAccelerate());

    // Get query parameters
    const page = parseInt(c.req.query("page") || "1", 10); // Default to page 1
    const limit = parseInt(c.req.query("limit") || "10", 10); // Default to 10 blogs per page
    const skip = (page - 1) * limit;

    if (page <= 0 || limit <= 0) {
      return c.json(
        { error: "Page and limit must be positive integers" },
        400
      );
    }

    try {
      // Fetch paginated blogs from the database
      const blogs = await prisma.post.findMany({
        select:{
          id:true, 
          publishedAt:true,
          author:{
            select:{
              id:true,
              name:true
            }
          },
          title:true,
          content:true,
        },
        skip,
        take: limit,
      });

      // Count total number of blogs
      const totalBlogs = await prisma.post.count();

      return c.json(
        {
          blogs,
          pagination: {
            currentPage: page,
            totalPages: Math.ceil(totalBlogs / limit),
            totalBlogs,
          },
        },
        200
      );
    } catch (prismaError: any) {
      console.error("Prisma error while fetching blogs:", prismaError);
      return c.json({ error: "Error fetching blogs" }, 500);
    }
  } catch (error: any) {
    console.error("Unexpected error while fetching blogs:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});



// Get blog
blogRoutes.get('/:id', async (c)=>{
  try{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL_CPOOL
    }).$extends(withAccelerate());

    const blogId = c.req.param('id');
    if (!blogId) {
      return c.json({ error: "Blog ID is required" }, 400);
    }

    try{

      const blog = await prisma.post.findFirst({
        where:{id: blogId},
        select:{
          id:true, 
          publishedAt:true,
          published:true,
          author:{
            select:{
              id:true,
              name:true
            }
          },
          title:true,
          content:true,
        },
      })

      // If no blog is found, return a 404 error
      if (!blog) {
        return c.json({ error: "Blog not found" }, 404);
      }

      return c.json({blog}, 200);

    }catch (prismaError: any) {
      console.error("Prisma error during fetching blog:", prismaError);
      return c.json({ error: "Error fetching blog details" }, 500);
    }
  } catch (error: any) {
    console.error("Unexpected error during signup:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Delete blog
blogRoutes.delete('/:id', async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL_CPOOL,
    }).$extends(withAccelerate());

    const blogId = c.req.param('id');
    if (!blogId) {
      return c.json({ error: "Blog ID is required" }, 400);
    }

    try {
      // Delete the blog by its ID
      const deletedBlog = await prisma.post.delete({
        where: { id: blogId },
      });

      // If no blog is found, return a 404 error
      if (!deletedBlog) {
        return c.json({ error: "Blog not found" }, 404);
      }

      return c.json({ message: "Blog deleted successfully" }, 200);
    } catch (prismaError: any) {
      console.error("Prisma error during deleting blog:", prismaError);
      return c.json({ error: "Error deleting blog" }, 500);
    }
  } catch (error: any) {
    console.error("Unexpected error during delete operation:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});


export default blogRoutes;
