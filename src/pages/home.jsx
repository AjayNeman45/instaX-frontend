import React from 'react'
import Sidebar from '../components/sidebar'
import Suggestion from '../components/suggestion'
import Feed from '../components/feed'

const Home = () => {
    return (
        <>
            {/* <Header /> */}
            <div className='flex items-start justify-between bg-purple-100 p-4 gap-3 min-h-[90.8vh] pt-16 h-fit relative'>
                <Sidebar />
                <Feed />
                <Suggestion />
            </div>
        </>
    )
}

export default Home