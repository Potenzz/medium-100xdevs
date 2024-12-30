import { Avatar } from "./BlogCard";
import type { BlogCardProps } from "./BlogCard";

const FullBlogCard = ({
    authorName,
    title,
    content,
    publishedAt,
}: BlogCardProps) => {

    const formattedDate = new Date(publishedAt).getTime() ? new Date(publishedAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    }) : "Unknown Date";


    return <>
        <div className="grid grid-cols-12 px-36 pt-20 pb-20 h-screen">
            <div className="col-span-8">
                <div className=" pr-10 text-4xl font-extrabold font-sans">
                    {title}
                </div>
                <div className="mt-2 text-slate-600">
                    Posted on {formattedDate}
                </div>
                <div className="mt-4 font-normal">
                    {content}
                </div>
            </div>
            <div className="col-span-4 pl-16">
                <div className="font-semibold">Author</div>
                <div className="flex pt-8 items-center">
                    <Avatar authorName={authorName} />
                    <div className="ml-4 font-semibold text-2xl">{authorName}</div> 
                </div>
            </div>

        </div>
    </>
}



export { FullBlogCard }