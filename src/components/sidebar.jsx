import React from 'react'
import { PiSquaresFourFill } from "react-icons/pi";
import { ImTree } from "react-icons/im";
import { MdEmojiEvents } from "react-icons/md";
import { BiSolidVideos, BiMessageSquareDetail } from "react-icons/bi";
import ProfileCard from './profileCard';
import { RiUserFollowLine } from "react-icons/ri";
import { SlUserFollowing } from "react-icons/sl";
import { SiEbox } from "react-icons/si";


import logo from "../assets/logo1.png"


const categories = [
    {
        id: 1,
        name: "Feed",
        logo: PiSquaresFourFill,
        active: true
    },
    {
        id: 2,
        name: "Followers",
        logo: RiUserFollowLine,
        active: false
    },
    {
        id: 3,
        name: "Following",
        logo: SlUserFollowing
    },
    {
        id: 4,
        name: "Messages",
        logo: BiMessageSquareDetail
    },
    {
        id: 5,
        name: "My Posts",
        logo: SiEbox
    },
    {
        id: 6,
        name: "Saved Posts",
        logo: BiSolidVideos
    },
    {
        id: 7,
        name: "Liked Posts",
        logo: BiSolidVideos
    },
    {
        id: 8,
        name: "Post",
        logo: BiSolidVideos,
        createPostButton: true
    },
]

const Sidebar = () => {
    return (
        <div>
            <div className='fixed w-[20rem] top-5 left-24'>
                <img src={logo} alt="logo" className='w-[120px]' />
                {/* <span className="text-[2rem] flex items-center mr-10">Insta<TbArrowsCross /></span> */}
            </div>
            <ProfileCard />
            <div className='flex flex-col gap-4 border border-b-0 border-t-0 border-l-0 border-r-3 flex-shrink-0 flex-grow-0 w-[20rem] bg-white p-3 rounded-lg fixed mt-[5.5rem]'>
                {
                    categories.map(category => {
                        return (
                            <div key={category.id} className={`flex items-center gap-5  border rounded-2xl p-2 border-gray-200 cursor-pointer hover:shadow-md transition duration-300 ease-in-out ${category.active && 'shadow-md border-[#dcc3f1]'} ${category.createPostButton && 'bg-[#8C28E3]'}`}>
                                <category.logo size={25} color={category.active ? "#8C28E3" : (category.createPostButton ? "white" : "gray")} />
                                <span className={`${category.active && "text-[#8C28E3] font-bold"} ${category.createPostButton ? "text-white" : "text-gray"}`}>{category.name}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Sidebar