import Appbar from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { Skeleton } from "../components/Skeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
    const {loading, blogs, error}= useBlogs();

    if(loading){
        return <div>
            <Appbar/>
            <Skeleton/>
        </div>
    }

     if (error) {
        return (
            <div>
                <Appbar />
                <div className="text-center text-red-500 font-semibold mt-4">
                    {error}
                </div>
            </div>
        );
    }

    return <div>
        <Appbar />

        <div className="flex justify-center" >
            <div >
            {blogs.map((blog)=>{
                return (
                    <BlogCard
                        id={blog.id}
                        authorName = {blog.author.name || "Unknown Author"}
                        publishedAt={blog.publishedAt}
                        title={blog.title}
                        content={blog.content}
                    />
                )
            })}
            </div>
        </div>
    </div>
}