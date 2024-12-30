import { useParams } from "react-router-dom"
import { useBlog } from "../hooks"
import Appbar from "../components/AppBar";
import { Skeleton_BlogPage } from "../components/Skeleton";
import { FullBlogCard } from "../components/FullBlogCard";

export const Blog = () => {
    const {id} = useParams();
    const {loading, blog, error} = useBlog({
        id: id || "",
    })

    if(loading){
        return <div>
            <Appbar/>
            <Skeleton_BlogPage/>
        </div>
    }

    if (error) {
        return (
            <div>
                <Appbar />
                <div className="flex justify-center items-center flex-col h-screen w-screen text-red-500 font-semibold">
                    {error }
                </div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div>
                <Appbar />
                <div className="flex justify-center items-center flex-col h-screen w-screen text-gray-500 font-semibold">
                    Blog not found.
                </div>
            </div>
        );
    }

    return <div>
        <Appbar />

        <div className="flex justify-center" >
            <div >
                <FullBlogCard
                    id={blog.id}
                    authorName = {blog.author.name || "Unknown Author"}
                    publishedAt={blog.publishedAt}
                    title={blog.title}
                    content={blog.content}
                />
            </div>
        </div>
    </div>
}