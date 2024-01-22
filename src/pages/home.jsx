import React from 'react'
import Sidebar from '../components/sidebar'
import Suggestion from '../components/suggestion'
import Feed from '../components/feed'
import { useAuthContext } from '../context/authContext.jsx'
import Header from '../components/header.jsx'

const Home = () => {
    const { user } = useAuthContext()
    return (
        <>
            <Header user={user} />
            <div className='flex items-start justify-between bg-purple-100 p-4 gap-3 min-h-[90.8vh] pt-20 h-fit'>
                <Sidebar />
                <Feed user={user} />
                <Suggestion />
            </div>
        </>
    )
}

export default Home