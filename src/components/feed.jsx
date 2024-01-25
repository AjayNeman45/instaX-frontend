import React, { useEffect, useState } from 'react'
import CreatePost from './createPost.jsx'
import axios from "../config/axios.config.js"
import Post from './post.jsx'

const Feed = () => {

    const [posts, setPosts] = useState([])

    const handleUpdatePosts = (data) => {
        setPosts(prevPosts => {
            return [data, ...prevPosts]
        })
    }

    useEffect(() => {
        (async () => {
            const { data: result } = await axios.get("/post/getAllPosts")
            if (result.success) setPosts(result.data.response)
        })()
    }, [])

    return (
        <div className='flex flex-col gap-3 ml-[20rem]'>
            <CreatePost handleUpdatePosts={handleUpdatePosts} />
            {
                posts?.map(post => {
                    return (
                        <div key={post?._id}>
                            <Post post={post} setPosts={setPosts} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Feed
