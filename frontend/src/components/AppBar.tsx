import { Avatar } from "./BlogCard";

const Appbar = () => {
    return <div className="border-b flex justify-between px-10 py-4">
        <div className="flex justify-center flex-col ">Medium</div>
        <div><Avatar authorName="Vishnu"/></div>
    </div>
}

export default Appbar;