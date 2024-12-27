import { Link } from "react-router-dom";
import { ChangeEvent, useState } from "react"; 
import { SignupSchema } from "@potenz/medium-common";


const Auth = ({type}:{type:"signup" | "signin"}) => {
    const [postInputs, setPostInputs] = useState<SignupSchema>({
        email:"",
        password:"",
        name:"",
    })

    return (
        <div className="flex justify-center h-screen items-center ">
            <div>
                <div className="text-4xl font-bold">Create an account</div>
                <div className="text-lg text-slate-400 items-center ml-4 mt-2">
                    {type=="signup"? "Already have an account": "Don't have an account"}?{" "}
                    <Link 
                    className="underline"
                    to={type=="signup"? "/signin":"/signup"}
                    >
                        {type=="signup"? "Login":"Sign up"}
                    </Link>
                </div>

                <div className="flex flex-col gap-4 mt-4 "> 

                    { type==="signup" && <LabelledInput 
                    label="Full Name"  
                    placeholder="Vishnu"
                    value={postInputs.name!}
                    onChange={(e)=>{
                        setPostInputs((c)=>({
                            ...c,
                            name: e.target.value,
                        }));
                    }}
                    />}

                    <LabelledInput
                    label="Email"
                    placeholder="vishnu@gmail.com"
                    value={postInputs.email}
                    onChange={(e)=>{
                        setPostInputs((c)=>({
                            ...c, 
                            email:e.target.value
                        }))
                    }}
                    />

                    <LabelledInput
                    label="Password"
                    placeholder="12345678"
                    value={postInputs.password}
                    type="password"
                    onChange={(e)=>{
                        setPostInputs((c)=>({
                            ...c, 
                            password:e.target.value
                        }));
                    }}
                    />

                    <button 
                    type="button" 
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                    {type=="signup"?"Sign up":"Sign in"}
                    //onclick
                    </button>


                </div>
            </div>

        </div>
    )
}

export default Auth;

interface labelledInputType {
    label:string;
    type?:string;
    placeholder:string;
    value:string;
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void
}

function LabelledInput({label, type, placeholder, onChange, value}:labelledInputType){
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return <div>
    <label 
        htmlFor={label.toLowerCase()} 
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
    </label>
    <div className="relative">
        <input 
            type={showPassword ? "text" : type || "text"}
            id={label.toLowerCase()} 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder={placeholder} 
            onChange={onChange}
            value={value}
            required />
            
        {type === "password" && (
        <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 dark:text-gray-300"
            >
            {showPassword ? "Hide" : "Show"}
        </button>
        )}
    </div>
</div>
}