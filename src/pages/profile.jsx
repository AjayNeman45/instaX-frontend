import React, { useEffect, useState } from 'react'
import { Button, Avatar } from '@nextui-org/react';
import { FaRegCalendarAlt } from "react-icons/fa";

import Sidebar from '../components/sidebar'
import axios from '../config/axios.config.js';
import Post from '../components/post.jsx';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuthContext } from '../context/authContext.jsx';
import { BsPostcardHeart } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import PostSkeleton from '../components/skeleton.jsx';


const Profile = () => {

    const { user: loggedInUser, setUser: setLoggedInUser } = useAuthContext()
    const [user, setUser] = useState(null)
    const [posts, setPosts] = useState([])
    const [postLoading, setPostLoading] = useState(true)


    const navigate = useNavigate()
    const { username, action } = useParams();
    useEffect(() => {
        (async () => {
            const { data: userRes } = await axios.get(`/auth/users/${username}`)
            setUser(userRes.data.response[0])
        })()
    }, [username])

    const path = window.location.pathname

    useEffect(() => {
        (async () => {
            if (user) {
                setPostLoading(true)
                const path = window.location.pathname
                if (path.includes("/saved")) {
                    const { data: getPostRes } = await axios.get(`/post/getSavedPostByUserId/${user?._id}`)
                    setPosts(getPostRes.data.response)
                } else {
                    const { data: getPostRes } = await axios.get(`/post/getPostByUserId/${user?._id}`)
                    setPosts(getPostRes.data.response)
                }
                setPostLoading(false)
            }
        })()
    }, [user, action])

    const handleRemoveUnsavePost = (postId) => {
        setPosts((prev) => prev.filter(post => post?._id != postId && post))
    }

    const handleUnfollowUser = async () => {
        let followingId = user?._id //opened profile user
        let followerId = loggedInUser?._id //loggedin user
        let packet = {
            userId: followingId,
            followerId: followerId,
        }

        let newUser = {
            ...loggedInUser,
            followings: loggedInUser.followings.filter(
                following => following !== followingId
            ),
        }
        setLoggedInUser(newUser)
        sessionStorage.setItem("user", JSON.stringify(newUser))
        await axios.post("/connection/removeFollowerAndFollowing", packet)
    }
    const handleFollowUser = async () => {
        let followingId = loggedInUser?._id //loggedin user
        let followerId = user?._id //opened profile user
        let packet = {
            userId: followerId,
            followerId: followingId,
        }
        let newUser = { ...loggedInUser, followings: [...loggedInUser?.followings, followerId] }
        setLoggedInUser(newUser)
        sessionStorage.setItem("user", JSON.stringify(newUser))
        await axios.post("/connection/addFollowerAndFollowing", packet)
    }


    return (
        <div className='bg-purple-100 min-h-screen p-4'>
            <Sidebar />


            <Link to="/">
                <BiArrowBack size={30} className='hidden profilePagebackButtin cursor-pointer' />
            </Link>

            {/* personal info */}
            <div className='ml-[23.7rem] bg-white mr-[23.7rem] mt-[2.7rem] p-3 rounded-lg personalInfo flex flex-wrap items-start justify-center gap-10'>
                <div className="flex flex-col items-center">
                    <Avatar src={user?.profilePhoto} className='w-[100px] h-[100px] rounded-[50%] object-cover' />
                    <div className='flex flex-col'>
                        <span>{user?.name}</span>
                        <span className='text-gray-400'>@{user?.username}</span>
                    </div>
                </div>
                <div className='flex flex-col items-start gap-2 personalInfo_stats'>
                    {
                        user?._id === loggedInUser?._id ?
                            <div className='flex items-center gap-3'>
                                <Button onClick={handleUnfollowUser} className='text-[#8C28E3] text-[15px] bg-white border border-[#8C28E3]' size='sm' radius='md'>Edit Profile</Button>
                            </div>
                            :
                            <div>
                                {
                                    loggedInUser?.followings?.includes(user?._id)
                                        ? <Button onClick={handleUnfollowUser} className='text-[#8C28E3] text-[15px] bg-white border border-[#8C28E3]' size='sm' radius='md'>Unfollow</Button>
                                        : <Button onClick={handleFollowUser} className='text-[#8C28E3] text-[15px] bg-white border border-[#8C28E3]' size='sm' radius='md'>Follow</Button>
                                }

                            </div>
                    }

                    <div className='flex items-center gap-2'>
                        <div>
                            <span className='font-semibold text-lg mr-2'>{user?.followers?.length}</span>
                            <span>followers</span>
                        </div>
                        <div>
                            <span className='font-semibold text-lg mr-2'>{user?.followings?.length}</span>
                            <span>followings</span>
                        </div>
                    </div>
                    <div>
                        <p className='max-w-[20rem]'>{user?.description}</p>
                        <span className='flex items-center gap-2 text-gray-400'><FaRegCalendarAlt /> Joined {new Date(user?.createdAt).toLocaleString("en-US", { timeZone: "Asia/Kolkata", month: "short", year: "numeric" })}</span>
                    </div>
                </div>
            </div>

            {/* post related info  */}
            <div className='ml-[23.7rem] mr-[23.7rem] postInfo'>
                <div className='flex items-center m-auto justify-center gap-5 bg-white w-fit px-2 py-1 rounded-full my-2'>
                    <span onClick={() => navigate(`/${username}`)} className={`transition ease-in-out duration-1000 transform ${!path.includes("/saved") ? 'bg-[#8C28E3] px-2 py-1 text-white rounded-full' : 'text-gray-400 hover:text-gray-600'} cursor-pointer text-sm`}>POSTS</span>
                    <span onClick={() => navigate(`/${username}/saved`)} className={`transition ease-in-out duration-1000 transform ${path.includes("/saved") ? 'bg-[#8C28E3] px-2 py-1 text-white rounded-full' : 'text-gray-400 hover:text-gray-600'} cursor-pointer text-sm`}>SAVED</span>
                </div>


                {
                    postLoading ? <PostSkeleton count={2} /> :
                        posts?.length ?
                            <div className='flex flex-col gap-3'>
                                {
                                    posts?.map((post, index) => {
                                        return (
                                            <div key={index}>
                                                <Post post={post} setPosts={setPosts} handleRemoveUnsavePost={handleRemoveUnsavePost} openProfileUser={user} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            : <div className='flex flex-col items-center bg-white p-3 rounded-md'>
                                <BsPostcardHeart size={30} />
                                <h1 className='text-2xl'>{path.includes("/saved") ? "Saved" : "Share"} photos</h1>
                                <span>When you {path.includes("/saved") ? "saved" : "share"} photos, they will appear on your profile.</span>
                            </div>
                }


            </div>
        </div>
    )
}

export default Profile