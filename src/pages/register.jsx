import React, { useState } from 'react'
import { Input, Button } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import logo from "../assets/logo1.png"
import { signUpFormValidation } from '../utils/validation';
import { useAuthContext } from '../context/authContext';
import axios from "../config/axios.config"


const Register = () => {

    const { register } = useAuthContext()
    const [formData, setFormData] = useState({})
    const [submitFormLoading, setSubmitFormLoading] = useState(false)
    const [validationError, setValidationError] = useState("")

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleFileChange = async (e) => {
        const file = e.target.files[0]
        setFormData(prev => ({ ...prev, image: file }))
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault()
        try {
            setSubmitFormLoading(true)
            // const { success, errors } = signUpFormValidation(formData)
            // if (!success) return setValidationError(errors)

            let data = new FormData()
            data.append("image", formData.image)
            const { data: uploadImageRes } = await axios.post("/post/uploadPostImage", data)
            if (!uploadImageRes.success) return

            const packet = {
                "username": formData.username,
                "password": formData.password,
                "description": formData.description,
                "profilePhoto": uploadImageRes.data.url,
                "email": formData.email,
                "name": formData.name
            }
            await register(packet)
        } catch (error) {
            toast(error)
        }
        setSubmitFormLoading(false)
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md flex flex-col items-center gap-5">
                    <img src={logo} alt="logo" className='w-[150px]' />
                    <form className='flex flex-col items-center gap-5' onSubmit={handleSubmitForm}>
                        <Input
                            type="text"
                            size='xs'
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-[20rem]"
                            required={true}
                        />
                        <Input
                            type="text"
                            size='xs'
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-[20rem]"
                        />

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

                        <label htmlFor="profilePhoto" className="text-sm bg-gray-100 w-[20rem] p-3 rounded-xl text-gray-500">
                            Select Profile Photo
                        </label>
                        <span>{formData?.image?.name}</span>
                        <input
                            type="file"
                            id="profilePhoto"
                            accept="image/*"
                            onChange={handleFileChange}
                            size="xsm"
                            className='hidden'
                        />
                        <Button
                            isLoading={submitFormLoading}
                            color="secondary"
                            type="submit"
                            onClick={handleSubmitForm}
                            className="w-full focus:outline-none focus:shadow-outline-blue text-lg font-semibold"
                        >
                            Sign Up
                        </Button>
                        <span className='flex items-center gap-2 justify-center'>Already have an account? <Link className='text-blue-400 font-bold' to="/login">Login</Link></span>

                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Register