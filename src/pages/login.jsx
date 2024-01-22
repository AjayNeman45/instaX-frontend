import React, { useState } from 'react';
import { Input } from '@nextui-org/react';

import { useAuthContext } from '../context/authContext.jsx'

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
        login(formData)
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6">Login to Your Account</h2>

                {/* Username and Password Fields */}
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <Input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                        onClick={handleFormSubmit}
                    >
                        Login
                    </button>
                </form>

                {/* <hr className="my-6 border-gray-300" /> */}

                {/* Social Media Login Options */}
                {/* <div className="flex space-x-4">
                    <button className="flex items-center justify-center w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
                        Login with Facebook
                    </button>
                    <button className="flex items-center justify-center w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red">
                        Login with Google
                    </button>
                </div> */}
            </div>
        </div>
    );
};

export default Login;
