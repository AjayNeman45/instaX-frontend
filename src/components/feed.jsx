import React, { useEffect, useState } from 'react'
import CreatePost from './createPost.jsx'
import axios from "axios"
import Post from './post.jsx'

const Feed = ({ user }) => {

    const [posts, setPosts] = useState([])

    const handleUpdatePosts = (data) => {
        setPosts(prevPosts => {
            return [data, ...prevPosts]
        })
    }

    useEffect(() => {
        (async () => {
            const { data: result } = await axios.get("http://localhost:3000/api/post/getAllPosts")
            if (result.success) setPosts(result.data.response)
        })()
    }, [])

    return (
        <div className='flex flex-col gap-3 ml-[20rem] w-[40rem]'>
            <CreatePost handleUpdatePosts={handleUpdatePosts} user={user} />
            {
                posts?.map(post => {
                    return (
                        <div key={post?._id}>
                            <Post post={post} setPosts={setPosts} user={user} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Feed