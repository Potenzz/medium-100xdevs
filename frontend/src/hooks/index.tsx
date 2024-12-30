import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config/config";


interface BlogProp {
    title: string;
    content: string;
    id: string;
    published:boolean,
    publishedAt:string;
    author: AuthorProp;
  }
  
interface AuthorProp {
name: string | null;
id: string;
}

const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<BlogProp[]>([]);
    const [error, setError] = useState<string | null>(null); 


    useEffect(()=>{
        const fetchBlogs = async () => {
            try{
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("Authentication token not found.");
                    setLoading(false);
                    return;
                }
                
                const response = await axios.get(`${BACKEND_URL}/api/v1/blogs/bulk`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`, 
                    },
                });

                // Check if blogs are returned properly
                if (response.data && Array.isArray(response.data.blogs)) {
                    setBlogs(response.data.blogs);
                } else {
                    setError("Invalid response format.");
                }

            } catch (err) {
                // Gracefully handle errors
                setError("Failed to fetch blogs. Please try again later.");
                console.error("Error fetching blogs:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return {
        loading,
        blogs,
        error,
    };
};


// hook for one blog
const useBlog = ({id}:{id:string}) => {

    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<BlogProp | null>(null);
    const [error, setError] = useState<string | null>(null); 


    useEffect(()=>{
        const fetchBlogs = async () => {
            try{
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("Authentication token not found.");
                    setLoading(false);
                    return;
                }
                
                const response = await axios.get(`${BACKEND_URL}/api/v1/blogs/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`, 
                    },
                });

                // Check if blogs are returned properly
                if (response.data) {
                    setBlog(response.data.blog);
                } else {
                    setError("Invalid response format.");
                }

            } catch (err) {
                // Gracefully handle errors
                setError("Failed to fetch this blog. Please try again later.");
                console.error("Error fetching this blog:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return {
        loading,
        blog,
        error,
    };
}


export {useBlogs, useBlog};
export type { BlogProp, AuthorProp };
