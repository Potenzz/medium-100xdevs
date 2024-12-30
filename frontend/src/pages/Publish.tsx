import { useState } from "react";
import Appbar from "../components/AppBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config/config";
import { BlogSchema } from "@potenz/medium-common";

const Publish = () => {
    return (
        <div>
            <Appbar />
            <TextEditor />
        </div>
    );
};

export { Publish };

function TextEditor() {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<BlogSchema>({
        title: "",
        content: "",
    });
    const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});
    const [serverError, setServerError] = useState<string | null>(null);
    const [isLoading, setisLoading] = useState<boolean>(false);



    const sendRequest = async () => {
        setisLoading(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setServerError("Authentication token not found.");
                setisLoading(false);
                return;
            }

            const res = await axios.post(`${BACKEND_URL}/api/v1/blogs`, postInputs, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            // Check if blogs are returned properly
            if (res.data) {
                navigate(`/blog/${res.data.blogId}`)
            } else {
                setServerError("Invalid response format.");
            }

        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const responseErrors = error.response?.data?.error;
                if (responseErrors && typeof responseErrors === "object") {
                    // Handle Zod validation errors
                    setValidationErrors(responseErrors);
                } else {
                    // Handle other server errors
                    setServerError(error.response?.data?.error || "Error while signing up/signing in!");
                }
            } else {
                setServerError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setisLoading(false);
        }
    };

    return (
        <div>
            <form className="max-w-screen-md mx-auto mt-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    sendRequest();
                }}>

                <div className="mb-4">
                    <label
                        htmlFor="title"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        placeholder="Writa a title"
                        required
                        value={postInputs.title}
                        onChange={(e) => {
                            setPostInputs((c) => ({
                                ...c,
                                title: e.target.value
                            }))
                        }}
                    />
                    {validationErrors?.title?.map((error, index) => (
                        <p key={index} className="text-red-500 text-sm">
                            {error}
                        </p>
                    ))}
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="editor"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Content
                    </label>
                    <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 ">
                        <div className="px-4 py-2 bg-white rounded-b-lg ">

                            <textarea
                                id="editor"
                                rows={8}
                                className="block w-full px-0 text-sm text-gray-800 bg-white border-0 focus:outline-none"
                                placeholder="Write an article..."
                                required
                                value={postInputs.content}
                                onChange={(e) => {
                                    setPostInputs((c) => ({
                                        ...c,
                                        content: e.target.value
                                    }))
                                }}
                            ></textarea>
                            {validationErrors?.content?.map((error, index) => (
                                <p key={index} className="text-red-500 text-sm">
                                    {error}
                                </p>
                            ))}
                        </div>
                    </div></div>


                <button
                    type="submit"
                    className="inline-flex items-center px-5 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                            Publishing...
                        </div>
                    ) : (
                        "Publish Post"
                    )}
                </button>

                {serverError && (
                    <p className="text-red-500 mt-2">{serverError}</p>
                )}

            </form>
        </div>
    );
}