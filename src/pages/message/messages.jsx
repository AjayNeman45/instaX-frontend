import React from 'react'
import Sidebar from '../../components/sidebar'
import Users from './users'
import MessageFeed from './messageFeed'

const Messages = () => {
    return (
        <div className='bg-purple-100 p-4 min-h-[100vh] h-fit relative flex '>
            <Sidebar />
            <Users />
            <MessageFeed />
        </div>
    )
}

export default Messages