import React from 'react'
import { PiSquaresFourFill } from "react-icons/pi";
import { BiSolidVideos, BiMessageSquareDetail } from "react-icons/bi";
import ProfileCard from './profileCard';
import { RiUserFollowLine } from "react-icons/ri";
import { SlUserFollowing } from "react-icons/sl";
import { SiEbox } from "react-icons/si";
import { AiOutlineNotification } from "react-icons/ai";
import { RiProfileLine } from "react-icons/ri";


import logo from "../assets/logo1.png"
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';


const categories = [
    {
        id: 1,
        name: "Feed",
        logo: PiSquaresFourFill,
        path: "/",
        active: true
    },
    // {
    //     id: 2,
    //     name: "Followers",
    //     path: "/followers",
    //     logo: RiUserFollowLine,
    //     active: false
    // },
    // {
    //     id: 3,
    //     name: "Following",
    //     path: "/followings",
    //     logo: SlUserFollowing
    // },
    {
        id: 4,
        name: "Messages",
        path: "/",
        logo: BiMessageSquareDetail
    },
    {
        id: 5,
        name: "Notifications",
        path: "/",
        logo: AiOutlineNotification
    },
    {
        id: 6,
        name: "Profile",
        logo: RiProfileLine
    },
    // {
    //     id: 5,
    //     name: "My Posts",
    //     path: "/posts/",
    //     logo: SiEbox
    // },
    // {
    //     id: 6,
    //     name: "Saved Posts",
    //     path: "/posts/saved",
    //     logo: BiSolidVideos
    // },
    // {
    //     id: 7,
    //     name: "Liked Posts",
    //     path: "/posts/liked",
    //     logo: BiSolidVideos
    // },
    {
        id: 8,
        name: "Post",
        logo: BiSolidVideos,
        createPostButton: true
    },
]

const Sidebar = () => {

    const navigate = useNavigate()
    const { user } = useAuthContext()

    const handleNavigation = (category) => {
        if (category.name.toLowerCase().includes("profile"))
            navigate(`/${user?.username}`)
        else
            navigate(category.path)
    }
    return (
        <div className='fixed left-4 w-[20rem] sidebar'>
            <div className='mb-3'>
                <img src={logo} alt="logo" className='w-[120px]' onClick={() => navigate("/")} />
                {/* <span className="text-[2rem] flex items-center mr-10">Insta<TbArrowsCross /></span> */}
            </div>
            <div className='flex flex-col gap-4 flex-shrink-0 flex-grow-0 w-[20rem] bg-white p-3 rounded-lg'>
                {
                    categories.map(category => {
                        return (
                            <div onClick={() => handleNavigation(category)} key={category.id} className={`flex items-center gap-5  border rounded-2xl p-2 border-gray-200 cursor-pointer hover:shadow-md transition duration-300 ease-in-out ${category.active && 'shadow-md border-[#dcc3f1]'} ${category.createPostButton && 'bg-[#8C28E3]'}`}>
                                <category.logo size={25} color={category.active ? "#8C28E3" : (category.createPostButton ? "white" : "gray")} />
                                <span className={`${category.active && "text-[#8C28E3] font-bold"} ${category.createPostButton ? "text-white" : "text-gray"}`}>{category.name}</span>
                            </div>
                        )
                    })
                }
            </div>
            <ProfileCard />
        </div>
    )
}

export default Sidebar