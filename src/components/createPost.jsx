import React, { useRef, useState } from 'react'
import { Avatar } from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import { FaImage } from "react-icons/fa6";
import { MdEmojiEmotions } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import axios from "../config/axios.config"
import EmojiPicker from 'emoji-picker-react';


const CreatePost = ({ handleUpdatePosts, user }) => {
    const [text, setText] = useState("")
    const [image, setImage] = useState("")
    const [previewUrl, setPreviewUrl] = useState("")
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const textAreaRef = useRef()

    const handleImageInputChange = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        setImage(file)
        reader.onloadend = () => {
            setPreviewUrl(reader.result)
        }
        if (file) {
            reader.readAsDataURL(file)
        }
    }

    const handleRemoveClick = () => {
        // Clear selected file and preview URL
        setImage(null);
        setPreviewUrl(null);
    };

    const handleCreatePost = async (e) => {
        e.preventDefault()
        // upload image to firebase storage
        try {
            let imageUploadRes
            if (image) {
                let data = new FormData()
                data.append("image", image)

                const response = await axios.post("/post/uploadPostImage", data)
                if (response.data.success)
                    imageUploadRes = response.data
            }

            const packet = {
                userId: "65abe9046eab8fcca19ec840",
                text: text,
                ...(imageUploadRes ? { image: imageUploadRes.data.url } : null),
            }
            const { data: postCreateRes } = await axios.post("/post/create", packet)
            if (postCreateRes.success) {
                handleUpdatePosts({ ...postCreateRes.data.response, user })
            }
        } catch (error) {
        }

        setImage("")
        setText("")
        setPreviewUrl("")
        setShowEmojiPicker(false)
    }

    const handleOnEmojiClick = (e) => {

        let emoji = e.emoji
        // Get the current cursor position
        const cursorPosition = textAreaRef.current.selectionStart;

        // Get the current input value
        const inputValue = textAreaRef.current.value;

        // Insert the emoji at the cursor position
        const updatedValue =
            inputValue.substring(0, cursorPosition) + emoji + inputValue.substring(cursorPosition);


        // Update the input value
        textAreaRef.current.value = updatedValue;

        setText(updatedValue)

        // Move the cursor to the end of the inserted emoji
        textAreaRef.current.setSelectionRange(cursorPosition + emoji.length, cursorPosition + emoji.length);

    }

    return (
        <div className='relative'>
            <div className='flex items-start gap-4 bg-white rounded-lg p-3 z-auto'>
                <span>
                    <Avatar src={user?.profilePhoto} />
                </span>
                <div className='w-full flex flex-col items-center'>
                    <textarea
                        className="resize-none overflow-y-hidden border p-2 min-h-[2rem] w-full outline-none border-none text-lg"
                        placeholder='what is happening?'
                        value={text}
                        onChange={e => setText(e.target.value)}
                        ref={textAreaRef}
                        onInput={(e) => {
                            e.target.style.height = "auto";
                            e.target.style.height = e.target.scrollHeight + "px";
                        }}>

                    </textarea>

                    {
                        previewUrl &&
                        <div className="mt-2 relative">
                            <button
                                type="button"
                                onClick={handleRemoveClick}
                                className="absolute top-0 right-0 bg-transparent border-none cursor-pointer outline-none"
                            >
                                <IoMdCloseCircle size={25} color='white' />
                            </button>
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="w-full h-auto max-h-100 object-cover rounded-md"
                            />
                        </div>
                    }


                    <div className='flex items-start justify-between w-full mt-2'>
                        <div className='flex items-center gap-6'>
                            <label htmlFor='imageInput'>
                                <FaImage size={20} color='purple' style={{ cursor: "pointer" }} />
                            </label>
                            <input id="imageInput" style={{ display: "none" }} onChange={handleImageInputChange} type="file" />
                            <MdEmojiEmotions size={23} color='purple' style={{ cursor: "pointer" }} onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
                        </div>
                        <Button color='secondary' isDisabled={text || previewUrl ? false : true} onClick={handleCreatePost}>Post</Button>
                    </div>
                </div>


            </div>
            {showEmojiPicker && <EmojiPicker className="absolute z-[999]" onEmojiClick={handleOnEmojiClick} />}
        </div>

    )
}

export default CreatePost