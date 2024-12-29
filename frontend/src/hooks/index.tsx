import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config/config";


export interface BlogProp {
    title: string;
    content: string;
    id: string;
    publishedAt:string;
    author: AuthorProp;
  }
  
export interface AuthorProp {
name: string | null;
id: string;
}

const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<BlogProp[]>([]);
    const [error, setError] = useState<string | null>(null); // Error state


    useEffect(()=>{
        const fetchBlogs = async () => {
            try{
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("Authentication token not found.");
                    setLoading(false);
                    return;
                }
                
                const response = await axios.get(`${BACKEND_URL}/api/v1/blogs/bulk1`, {// fix url
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

export {useBlogs};