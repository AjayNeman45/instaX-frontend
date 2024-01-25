import React from 'react'
import { Avatar, Tooltip } from '@nextui-org/react';
import { useAuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLogout } from "react-icons/ai";

const ProfileCard = () => {

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
        <div className='bg-white flex items-start p-3  gap-4 rounded-lg mb-3 cursor-pointer fixed w-[20rem]' onClick={() => navigate(`/${user?.username}`)} >
            <Avatar src={user?.profilePhoto} />
            <div className='flex items-center justify-between flex-1'>
                <div className='flex flex-col'>
                    <span>{user?.name}</span>
                    <span className='text-gray-400'>@{user?.username}</span>
                </div>
                <Tooltip
                    content="Logout"
                    placement='bottom'
                    className='z-[999]'
                >
                    <span onClick={handleLogout}>
                        <AiOutlineLogout size={20} />
                    </span>
                </Tooltip>
            </div>
        </div>
    )
}

export default ProfileCard