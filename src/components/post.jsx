import React, { useEffect, useState } from 'react'
import { Avatar, Tooltip } from '@nextui-org/react';
import { FaRegComment } from "react-icons/fa";
import { IoHeartOutline, IoHeartSharp, IoShareSocialOutline, IoBookmarkOutline, IoBookmarkSharp } from "react-icons/io5"

import { Input } from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react"

import axios from "../config/axios.config"
import ShowCommentsModal from './showCommentsModal.jsx';
import { RiUserUnfollowLine, RiUserFollowLine } from "react-icons/ri";
import { useAuthContext } from '../context/authContext.jsx';
import { LuDot } from "react-icons/lu";
import { timeAgo } from '../utils/utils.js';


const Post = ({ post, setPosts }) => {

    const { user, setUser } = useAuthContext()
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [commentText, setCommentText] = useState("")
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)

    const handleLikePost = async () => {
        const myLike = post?.likes?.filter(like => like?.user_id === user?._id);

        if (myLike?.length) {
            setPosts(prev => prev.map(p => (p._id === post._id ? { ...p, likes: p.likes.filter(like => like?.user_id !== user._id) } : p)));
            let packet = {
                userId: user?._id,
                postId: post?._id
            }
            await axios.post("/post/like/likeUnlike", packet);

        } else {
            setPosts(prev => prev.map(p => (p._id === post._id ? { ...p, likes: [{ user_id: user?._id, post_id: post?._id }, ...p.likes] } : p)));
            let packet = {
                userId: user?._id,
                postId: post?._id
            }
            await axios.post("/post/like/likeUnlike", packet);
        }
    };

    const handleSavePost = async () => {
        try {
            const mySave = post?.saves?.filter(save => save?.user_id === user?._id);
            if (mySave?.length) {
                setPosts(prev => prev.map(p => (p._id === post._id ? { ...p, saves: p.saves.filter(save => save?.user_id !== user._id) } : p)));
                let packet = {
                    userId: user?._id,
                    postId: post?._id
                }
                await axios.post("/post/save/saveUnsavePost", packet);

            } else {
                setPosts(prev => prev.map(p => (p._id === post._id ? { ...p, saves: [{ user_id: user?._id, post_id: post?._id }, ...p.saves] } : p)));
                let packet = {
                    userId: user?._id,
                    postId: post?._id
                }
                await axios.post("/post/save/saveUnsavePost", packet);
            }
        } catch (error) {
        }
    }

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

    const handleUnfollowUser = async () => {
        let followingId = post?.user?._id
        let followerId = user?._id
        let packet = {
            userId: followingId,
            followerId: followerId
        }

        let newUser = { ...user, followings: user.followings.filter(following => following !== followingId) }
        setUser(newUser)
        sessionStorage.setItem('user', JSON.stringify(newUser));
        await axios.post("/connection/removeFollowerAndFollowing", packet)
    }

    const handleFollowUser = async () => {
        let followingId = user?._id
        let followerId = post?.user?._id

        let packet = {
            userId: followerId,
            followerId: followingId
        }

        let newUser = ({ ...user, followings: [...user?.followings, followerId] })
        setUser(newUser)
        sessionStorage.setItem('user', JSON.stringify(newUser));
        await axios.post("/connection/addFollowerAndFollowing", packet)
    }

    return (
        <>
            <div className='flex items-start gap-5 bg-white rounded-md p-3'>
                <span><Avatar src={post?.user?.profilePhoto} /></span>
                <div className='w-full'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center'>
                            <span className='font-bold'>{post.user.name}</span>
                            <span className='text-gray-400 text-sm'> @{post.user.username}</span>
                            <span className='flex items-center text-sm text-gray-400'><LuDot />{timeAgo(new Date(post.createdAt))}</span>
                        </div>
                        {
                            post?.user?._id !== user?._id
                                ? user?.followings?.includes(post?.user?._id)
                                    ? <Tooltip showArrow={true} content={`Unfollow @${post?.user?.username}`} placement='bottom'>
                                        <span onClick={handleUnfollowUser} className='rounded-2xl p-2 cursor-pointer bg-red-100'>
                                            <RiUserUnfollowLine color='red' />
                                        </span>
                                    </Tooltip>
                                    : <Tooltip showArrow={true} content={`Follow @${post?.user?.username}`} placement='bottom'>
                                        <span onClick={handleFollowUser} className='rounded-2xl p-2 cursor-pointer bg-green-100'>
                                            <RiUserFollowLine color='green' />
                                        </span>
                                    </Tooltip>
                                : null
                        }
                    </div>
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
                            {
                                post?.likes?.filter((like) => like?.user_id === user?._id)?.length
                                    ? <IoHeartSharp onClick={handleLikePost} color='red' style={{ cursor: "pointer" }} />
                                    : <IoHeartOutline onClick={handleLikePost} color="gray" style={{ cursor: "pointer" }} />
                            }

                            <span className='text-sm cursor-pointer'>{post.likes && post.likes.length} Likes</span>
                        </div>
                        <div className='flex items-center gap-2'>

                            <IoShareSocialOutline color='gray' style={{ cursor: "pointer" }} />
                            <span className='text-sm cursor-pointer'>24 Share</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            {
                                post?.saves?.filter(save => save?.user_id === user?._id)?.length
                                    ? <IoBookmarkSharp onClick={handleSavePost} color='green' style={{ cursor: "pointer" }} />
                                    : <IoBookmarkOutline onClick={handleSavePost} color="gray" style={{ cursor: "pointer" }} />
                            }
                            <span className='text-sm cursor-pointer'>{post.saves && post.saves.length} Saved</span>
                        </div>
                    </div>

                    <div className='flex items-center gap-3'>
                        <Avatar src={user?.profilePhoto} size="md" />
                        <Input type="email" size='sdfsd' value={commentText} onChange={e => setCommentText(e.target.value)} onKeyUp={handleCommentInputKey} placeholder="Write your comment..." />
                        {/* <MdEmojiEmotions size={23} color="purple" style={{ cursor: "pointer" }} onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
                            {
                                showEmojiPicker && <EmojiPicker className="absolute right-2" theme='light' searchDisabled="true" suggestedEmojisMode='false' />
                            } */}

                    </div>

                </div>
            </div>
            <ShowCommentsModal isOpen={isOpen} onOpenChange={onOpenChange} comments={post.comments} user={user} post={post} setPosts={setPosts} />
        </>
    )
}

export default Post