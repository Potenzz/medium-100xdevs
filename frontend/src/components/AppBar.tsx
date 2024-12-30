import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

const Appbar = () => {
    return <div className="border-b flex justify-between px-10 py-4">
        <Link to={"/blogs"}
            className="flex justify-center flex-col cursor-pointer ">Medium
        </Link>
        <div><Avatar authorName="Vishnu"/></div>
    </div>
}

export default Appbar;