import React from 'react'
import Sidebar from '../components/sidebar'
import Suggestion from '../components/suggestion'
import Feed from '../components/feed'
import { User } from "@nextui-org/react";
import "../index.css"

const Home = () => {

    return (
        <>
            {/* <Header /> */}
            <div className='flex items-start justify-between bg-purple-100 p-4 min-h-[100vh]  h-fit relative'>
                <Sidebar />
                <Feed />
                <Suggestion />
            </div>
        </>
    )
}

export default Home