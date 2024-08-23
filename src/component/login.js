import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";

export default function Login(params) {
    document.body.style.backgroundColor = '#31344f';
     const apiKey = "https:/backenddata77720.onrender.com";
  
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            // User is logged in, redirect to home page
            navigate("/home");
        }
    }, [navigate, token]);

    const [wrongpass, setwrongpass] = useState(<div></div>);
    const [logindata, setlogindata] = useState({ password: "", email: "" });

 
const handlelogin = async (e) => {
    e.preventDefault();
    const { email, password } = logindata;

    try {

        const response = await axios.post(`${apiKey}/api/auth/login`, {

      

            email,
            password
        });

        const json = response.data;
        console.log(json)

        if (!json.success) {
            setwrongpass(json.message);
            console.log(json)
        } else {
            console.log(json)
            localStorage.setItem('token', json.authtoken);
            navigate("/home");
        }
    } catch (error) {
        console.error("An error occurred during login:", error);
        // Handle error, e.g., set an error message for the user
    }
};
 
 

    const onchange = (e) => {
        setlogindata({ ...logindata, [e.target.name]: e.target.value });
    };

    if (token) {
        return <div className="text-white text-center">Loading...</div>;
    }

    return (
        <div className="flex items-center w-full justify-center h-screen bg-gray-900">
            <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Login</h2>
               <div className="text-red-500 text-[12px] ">{wrongpass}</div> 
                <form onSubmit={handlelogin} className="space-y-4">
                    <div className="form-group">
                        <input
                            type="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            onChange={onchange}
                            value={logindata.email}
                            name='email'
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name='password'
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={onchange}
                            value={logindata.password}
                            id="Password"
                            placeholder="Password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Submit
                    </button>
                    <Link to="/forgotpassword"
                        type="submit"
                        className="w-full px-4 py-2   text-red-600 font-semibold rounded-md  focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Forgot password
                    </Link>
                </form>
                 
            </div>
        </div>
    );
}
