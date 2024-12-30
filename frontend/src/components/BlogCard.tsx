import { Link } from "react-router-dom";


interface BlogCardProps {
    id: string;
    authorName: string;
    title: string | null;
    content: string;
    publishedAt: string;
}

const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedAt
}: BlogCardProps) => {

    const formattedDate = new Date(publishedAt).getTime() ? new Date(publishedAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    }) : "Unknown Date";


    return <Link to={`/blog/${id}`}>
        <div className="border-b border-slate-200 pb-4 pt-4 max-width-screen-lg cursor-pointer">
            <div className="flex">
                <div className="flex pr-4 ">
                    <Avatar authorName={authorName} />
                </div>
                <div className="flex justify-center flex-col font-extralight pr-2 ">
                    {authorName}
                </div>
                <div className="flex justify-center flex-col pr-2">
                    <Circle />
                </div>
                <div className="flex justify-center flex-col font-thin text-color-400 ">
                    {formattedDate}
                </div>
            </div>
            <div className="text-md font-semibold pt-2">
                {title || "Untitled"}
            </div>
            <div className="text-sm font-thin">
                {content.length > 100 ? content.slice(0, 100) + "..." : content}
            </div>
            <div className="text-slate-500 text-sm font-thin pt-2 ">
                {`${Math.ceil(content.length / 100)} minutes read`}
            </div>

        </div>
    </Link>
}


const Avatar = ({ authorName }: { authorName: string }) => {
    return <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <span className="font-medium text-gray-600 dark:text-gray-300">{authorName ? authorName[0].toUpperCase() : "A"}</span>
    </div>

}

function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-400"></div>;
}


export { BlogCard, Avatar, Circle}
export type {BlogCardProps}