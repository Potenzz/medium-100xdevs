import { verify } from "hono/jwt";
import { Context } from "hono";

export const authMiddleware = async (c:Context, next: ()=>Promise<void>) => {
    try{
        const header = c.req.header("Authorization");

        if(!header || !header.startsWith("Bearer")){
            return c.json({
                error:"unauthorized token!"
            },401);
        };

        const token = header.split(' ')[1];
        
        const user = await verify(token, c.env.JWT_SECRET);

        if(!user){
            return c.json({error:"unauthorized"},401);
        }

        c.set('UserId', user.id);
        await next();
    }catch (error: any) {
        console.error('Error occurred in authMiddlware:', error);
    
        return c.json({
          error: error.message || 'Internal Server Error',
        },500); 

    }};