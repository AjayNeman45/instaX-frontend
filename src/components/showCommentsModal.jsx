import React, { useState } from 'react'
import axios from "../config/axios.config"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Avatar, Input } from "@nextui-org/react";
import { IoSendOutline } from 'react-icons/io5';

const ShowCommentsModal = ({ isOpen, onOpenChange, comments, user, post, setPosts }) => {
    // const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [commentText, setCommentText] = useState("")
    const handleCreateComment = async (e) => {
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

    return (
        <>
            {/* <Button onPress={onOpen}>Open Modal</Button> */}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl" className='z-[999] absolute left-[50%] transform translate-x-[-50%] top-[15%]'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Comments</ModalHeader>
                            <ModalBody>
                                <div className='flex flex-col gap-7 h-[20rem] overflow-y-auto'>
                                    {
                                        comments?.length ? comments?.map((comment, index) => {
                                            return <div key={comment._id} className='flex items-start gap-4'>
                                                <div className='relative flex'>
                                                    {
                                                        index !== comments?.length - 1 && <div className="border-l h-[80px] border-1 border-gray-400 absolute right-[45%]"></div>
                                                    }

                                                    <Avatar src={comment?.user?.profilePhoto} size='md' />
                                                </div>
                                                <div className=''>
                                                    <div>
                                                        <span className='font-bold'>{comment?.user?.name}</span>
                                                        <span className='text-gray-400'>@{comment?.user?.username}</span>
                                                    </div>
                                                    <div>
                                                        <span className='text-sm text-gray-500'>{new Date(comment?.createdAt).toLocaleString("en-US", { timeZone: 'Asia/Kolkata' })}</span>
                                                    </div>
                                                    <span>{comment?.comment}</span>
                                                </div>
                                            </div>
                                        })
                                            :
                                            <div className='h-screen flex flex-col items-center justify-center gap-5'>
                                                <img src="https://www.pngkey.com/png/full/62-624067_facebook-chat-clipart-online-chat-facebook-messenger-facebook.png" alt="commentLogoImage" height={130} width={110} />
                                                <h6 className='text-lg'>Be the First One to add a comment😎</h6>
                                            </div>
                                    }
                                </div>

                            </ModalBody>
                            <ModalFooter>
                                <div className='flex items-center gap-3 w-full'>
                                    <Avatar src={user?.profilePhoto} size='md' />
                                    <Input type="text" value={commentText} onKeyUp={e => e.code === "Enter" && handleCreateComment()} onChange={e => setCommentText(e.target.value)} size='sdfsd' placeholder="Write your comment..." />
                                    <div className="cursor-pointer">
                                        <IoSendOutline onClick={handleCreateComment} />
                                    </div>
                                </div>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>

    )
}

export default ShowCommentsModal