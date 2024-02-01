import React from 'react'
import Sidebar from '../components/sidebar'
import Suggestion from '../components/suggestion'
import Feed from '../components/feed'
import { User } from "@nextui-org/react";
import "../index.css"
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineLogout } from "react-icons/ai";
import { useAuthContext } from '../context/authContext';

const Home = () => {

    const { user, setUser, setIsAuthenticated } = useAuthContext()
    const navigate = useNavigate()

    const handleLogout = (e) => {
        e.stopPropagation()
        setUser(null)
        setIsAuthenticated(false)
        sessionStorage.removeItem("user")
        navigate("/login")
    }

    return (
        <>
            <div className=' bg-purple-100 p-4 min-h-[100vh]  h-fit relative'>
                <div className='header_for_phone hidden'>
                    <User
                        name={user?.name}
                        description={(
                            <Link href="#" size="sm">
                                @{user?.username}
                            </Link>
                        )}
                        avatarProps={{
                            src: user?.profilePhoto
                        }}
                        className='bg-white p-2'
                    />
                    <div className='bg-white p-2 rounded-md flex items-center gap-2 cursor-pointer' >
                        <AiOutlineLogout onClick={handleLogout} />
                        <span className='text-sm'>Logout</span>
                    </div>
                </div>
                <div className='flex items-start justify-between'>
                    <Sidebar />
                    <Feed />
                    <Suggestion />
                </div>
            </div>
        </>
    )
}

export default Home