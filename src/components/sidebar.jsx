import React from 'react'
import { PiSquaresFourFill } from "react-icons/pi";
import { ImTree } from "react-icons/im";
import { MdEmojiEvents } from "react-icons/md";
import { BiSolidVideos } from "react-icons/bi";
import ProfileCard from './profileCard';


const categories = [
    {
        id: 1,
        name: "Feed",
        logo: <PiSquaresFourFill size={25} color={"gray"} />
    },
    {
        id: 2,
        name: "Friends",
        logo: <ImTree size={25} color={"gray"} />,
        active: true
    },
    {
        id: 3,
        name: "Events",
        logo: <MdEmojiEvents size={25} color={"gray"} />
    },
    {
        id: 4,
        name: "Watch videos",
        logo: <BiSolidVideos size={25} color={"gray"} />
    },
]

const Sidebar = () => {
    return (
        <div>
            <ProfileCard />
            <div className='flex flex-col gap-4 border border-b-0 border-t-0 border-l-0 border-r-3 flex-shrink-0 flex-grow-0 w-[20rem] bg-white p-3 rounded-lg fixed mt-[5.5rem]'>
                {
                    categories.map(category => {
                        return (
                            <div key={category.id} className='flex items-center gap-5  border rounded-2xl p-2 border-gray-200 cursor-pointer hover:shadow-md transition duration-300 ease-in-out'>
                                {category.logo}
                                <span className={category.active ? "text-purple-900 font-bold" : null}>{category.name}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Sidebar