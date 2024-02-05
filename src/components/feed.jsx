import React, { useEffect, useState } from 'react'
import CreatePost from './createPost.jsx'
import axios from "../config/axios.config.js"
import Post from './post.jsx'
import "../index.css"
import PostSkeleton from './skeleton.jsx'

const Feed = () => {

    const [posts, setPosts] = useState([])
    const [postLoading, setPostLoading] = useState(true)

    const handleUpdatePosts = (data) => {
        setPosts(prevPosts => {
            return [data, ...prevPosts]
        })
    }

    useEffect(() => {
        const fetchPosts = async () => {
            setPostLoading(true)
            try {
                const { data: result } = await axios.get("/post/getAllPosts")
                if (result.success) setPosts(result.data.response)
            } catch (error) {

            }
            setPostLoading(true)
        }
        fetchPosts()
    }, [])

    return (
        <div className='ml-[23.7rem] mr-[23.7rem] mt-[2.7rem] flex-1 feed'>
            <div className='flex flex-col gap-3'>
                <CreatePost handleUpdatePosts={handleUpdatePosts} />
                {
                    postLoading ? <PostSkeleton count={2} /> :
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
