import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Spinner } from "@nextui-org/react";

import CreatePost from './createPost.jsx'
import axios from "../config/axios.config.js"
import Post from './post.jsx'
import "../index.css"
import PostSkeleton from './skeleton.jsx'

const Feed = () => {

    const [posts, setPosts] = useState([])
    const [postLoading, setPostLoading] = useState(false)
    const [pageNumber, setPageNumber] = useState(0)
    const [hasMore, setHasMore] = useState(true)

    const handleUpdatePosts = (data) => {
        setPosts(prevPosts => {
            return [data, ...prevPosts]
        })
    }

    const observer = useRef()
    const lastPostRef = useCallback((node) => {
        if (postLoading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPageNumber => prevPageNumber + 1)
            }
        })

        if (node) observer.current.observe(node)

    }, [postLoading, hasMore])


    const fetchPosts = async () => {
        setPostLoading(true)
        try {
            const { data: result } = await axios.get(`/post/getAllPosts?page=${pageNumber}`)
            if (result.success) {
                setPosts(prevData => [...prevData, ...result.data.response])
                setHasMore(result.data.response.length === 10 ? true : false)
            }
        } catch (error) {

        }
        setPostLoading(false)
    }

    useEffect(() => {
        if (pageNumber != 0) {
            fetchPosts()
        }
    }, [pageNumber])

    useEffect(() => {
        (async () => {
            setPostLoading(true)
            try {
                const { data: result } = await axios.get(`/post/getAllPosts?page=${pageNumber}`)
                if (result.success) {
                    setPosts(result.data.response)
                    setHasMore(result.data.response.length === 10 ? true : false)
                }
            } catch (error) {

            }
            setPostLoading(false)
        })()
    }, [])

    return (
        <div className='ml-[23.7rem] mr-[23.7rem] mt-[2.7rem] flex-1 feed'>
            <div className='flex flex-col gap-3'>
                <CreatePost handleUpdatePosts={handleUpdatePosts} />
                {
                    postLoading && pageNumber === 0 ? <PostSkeleton count={1} /> :
                        posts?.map((post, index) => {
                            return index === posts?.length - 1
                                ? <div key={post?._id} ref={lastPostRef}>
                                    <Post post={post} setPosts={setPosts} />
                                    {
                                        postLoading && pageNumber > 0 &&
                                        <div className='border text-center my-3'>
                                            <Spinner color="secondary" labelColor="secondary" />
                                        </div>
                                    }

                                </div> :
                                <div key={post?._id}>
                                    <Post post={post} setPosts={setPosts} />
                                </div>

                        })
                }
            </div>
        </div>
    )
}

export default Feed
