import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

const Appbar = () => {
    return <div className="border-b flex justify-between px-10 py-4">
        <Link to={"/blogs"}
            className="flex justify-center flex-col cursor-pointer ">Medium
        </Link>
        <div className="flex items-center space-x-4 ">
            <Link to={"/publish"}>
                <button type="button" className="mt-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">New Post</button>
            </Link>
            <Avatar authorName="Vishnu" />
        </div>
    </div>
}

export default Appbar;