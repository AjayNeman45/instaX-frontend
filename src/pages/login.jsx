import React, { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import { ToastContainer, toast } from 'react-toastify';
import { useAuthContext } from '../context/authContext.jsx'
import { Link } from 'react-router-dom';

import logo from "../assets/logo1.png"

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const { user, setUser, login } = useAuthContext()

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData)
        } catch (error) {
            console.log(error)
            toast(error)
        }
    };
    return (
        <>
            <div className="min-h-screen flex flex-col gap-4 items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md flex flex-col items-center gap-5">
                    <img src={logo} alt="logo" className='w-[150px]' />
                    {/* Username and Password Fields */}
                    <form onSubmit={handleFormSubmit} className='flex flex-col items-center gap-5'>
                        <div>
                            {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label> */}
                            <Input
                                type="text"
                                size='xs'
                                id="username"
                                name="username"
                                placeholder="Enter your username"
                                value={formData.username}
                                onChange={handleInputChange}
                                className="w-[20rem]"
                            />
                        </div>

                        <div className="">
                            {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label> */}
                            <Input
                                type="password"
                                size='xs'
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-[20rem]"
                            />
                        </div>

                        {/* Login Button */}
                        <Button
                            color="secondary"
                            type="submit"
                            className="w-full focus:outline-none focus:shadow-outline-blue text-lg font-semibold"
                        >
                            Login
                        </Button>
                        <span className='flex items-center gap-2 justify-center'>Don't have an account? <Link className='text-blue-400 font-bold' to="/register">Sign up</Link></span>
                    </form>
                </div>

                <div className='flex flex-col items-start bg-red-200 w-full max-w-md text-red-800 p-3 rounded-md'>
                    <span>Testing credentials</span>
                    <span>username: IamAj123</span>
                    <span>password: 123</span>
                    <span>Note: Please don't spam in the application</span>
                </div>
            </div>

            <ToastContainer />
        </>
    );
};

export default Login;
