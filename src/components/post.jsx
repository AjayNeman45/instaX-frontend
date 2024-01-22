import React, { useEffect, useState } from 'react'
import { Avatar } from '@nextui-org/react';
import { FaRegComment } from "react-icons/fa";
import { IoHeartOutline } from "react-icons/io5";
import { IoShareSocialOutline } from "react-icons/io5";
import { IoBookmarkOutline } from "react-icons/io5";
import { Input } from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react"

import axios from "../config/axios.config"
import ShowCommentsModal from './showCommentsModal.jsx';


const Post = ({ post, setPosts, user }) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [commentText, setCommentText] = useState("")
    const handleLikePost = async () => {
        const myLike = post?.likes?.filter(like => like?.user_id === user?._id);

        if (myLike?.length) {
            const { data: removeLikeRes } = await axios.get(`/post/like/delete/${myLike[0]?._id}`);

            if (removeLikeRes.success) {
                setPosts(prev => prev.map(p => (p._id === post._id ? { ...p, likes: p.likes.filter(like => like?.user_id !== user._id) } : p)));
            }
        } else {
            const { data: addLikeRes } = await axios.post("/post/like/create/", { userId: user?._id, postId: post?._id });

            if (addLikeRes.success) {
                setPosts(prev => prev.map(p => (p._id === post._id ? { ...p, likes: [{ ...addLikeRes.data.response }, ...p.likes] } : p)));
            }
        }
    };

    const handleCommentInputKey = async (e) => {
        if (e.code === "Enter") {
            const data = {
                postId: post?._id,
                userId: user?._id,
                comment: commentText
            }
            setCommentText("")
            const { data: addCommentRes } = await axios.post("/post/comment/create", data)
            if (addCommentRes?.success) {
                setPosts(prev => prev.map(p => (p._id === post._id ? { ...p, comments: [{ ...addCommentRes.data.response, user }, ...p.comments] } : p)));
            }
        }
    }

    return (
        <>
            <div className='flex items-start gap-5 bg-white rounded-md p-3'>
                <span><Avatar src={post?.user?.profilePhoto} /></span>
                <div className='w-full'>
                    <span className='font-bold'>{post.user.name}</span>
                    <span className='text-gray-400'>@{post.user.username}</span>
                    <p className='my-2 whitespace-pre-line'>{post.text}</p>

                    {
                        post.image && <img src={post.image} alt="Avatar"
                            className="w-full h-auto max-h-100 object-cover rounded-2xl"
                        />
                    }
                    <div className='w-full flex items-center justify-between my-3'>
                        <div className='flex items-center gap-2'>
                            <FaRegComment color='gray' style={{ cursor: "pointer" }} />
                            <span className='text-sm cursor-pointer' onClick={onOpen}>{post.comments && post.comments.length} Comments</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <IoHeartOutline onClick={handleLikePost} color={post?.likes?.filter((like) => like?.user_id === user?._id && like)?.length ? "red" : "gray"} style={{ cursor: "pointer" }} />
                            <span className='text-sm cursor-pointer'>{post.likes && post.likes.length} Likes</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <IoShareSocialOutline color='gray' style={{ cursor: "pointer" }} />
                            <span className='text-sm cursor-pointer'>24 Share</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <IoBookmarkOutline color='gray' style={{ cursor: "pointer" }} />
                            <span className='text-sm cursor-pointer'>12 Saved</span>
                        </div>
                    </div>

                    <div className='flex items-center gap-3'>
                        <Avatar src={user?.profilePhoto} size="md" />
                        <Input type="email" size='sdfsd' value={commentText} onChange={e => setCommentText(e.target.value)} onKeyUp={handleCommentInputKey} placeholder="Write your comment..." />
                    </div>
                </div>
            </div>
            <ShowCommentsModal isOpen={isOpen} onOpenChange={onOpenChange} comments={post.comments} user={user} post={post} setPosts={setPosts} />
        </>
    )
}

export default Post