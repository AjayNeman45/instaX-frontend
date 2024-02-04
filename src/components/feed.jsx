import React, { useEffect, useState } from 'react'
import CreatePost from './createPost.jsx'
import axios from "../config/axios.config.js"
import Post from './post.jsx'
import "../index.css"

const Feed = () => {

    const [posts, setPosts] = useState([])

    const handleUpdatePosts = (data) => {
        setPosts(prevPosts => {
            return [data, ...prevPosts]
        })
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const { data: result } = await axios.get("/post/getAllPosts")
            if (result.success) setPosts(result.data.response)

        }
        fetchPosts()
    }, [])

    return (
        <div className='ml-[20.7rem] mr-[20.7rem] mt-[2.7rem] flex-1 feed'>
            <div className='flex flex-col gap-3'>
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
        </div>
    )
}

export default Feed
