import React from 'react'
import { Avatar } from '@nextui-org/react';
import { useAuthContext } from '../context/authContext';

const ProfileCard = () => {

    const { user } = useAuthContext()
    return (
        <div className='bg-white flex items-start gap-4 p-3 rounded-lg mb-3 cursor-pointer fixed w-[20rem]'>
            <Avatar src={user?.profilePhoto} />
            <div className='flex flex-col'>
                <span>{user?.name}</span>
                <span className='text-gray-400'>@{user?.username}</span>
            </div>
        </div>
    )
}

export default ProfileCard