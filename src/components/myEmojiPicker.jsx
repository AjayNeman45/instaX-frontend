import React, { useEffect, useRef, useState } from 'react'
import Emojies from "../utils/emoji.json"


const MyEmojiPicker = ({ children, onClickEmoji }) => {

    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [emojies, setEmojies] = useState([])
    const pickerRef = useRef()
    const openBtnRef = useRef()

    useEffect(() => {
        setEmojies(Emojies)
    }, [Emojies])

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target) && !openBtnRef.current.contains(event.target)) {
                setShowEmojiPicker(false);
                pickerRef.current.style.display = "none"
            }
        };
        window.addEventListener('click', handleOutsideClick);

        return () => {
            window.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    const handleToggleEmojiPicker = () => {
        setShowEmojiPicker(!showEmojiPicker)
        if (showEmojiPicker) {
            pickerRef.current.style.display = "none"
        } else {
            pickerRef.current.style.display = "flex"
            pickerRef.current.style.flexDirection = "column"
            pickerRef.current.style.gap = "1rem"
        }
    }

    const handleSearchEmoji = (e) => {
        let value = e.target.value.toLowerCase()
        setEmojies(() => {
            if (value)
                return Emojies.filter(emoji => {
                    if (emoji.description.toLowerCase().includes(value)) return emoji
                    else if (emoji.category.toLowerCase().includes(value)) return emoji
                    else if (emoji.aliases.filter(alias => alias.toLowerCase().includes(value)).length) return emoji
                    else if (emoji.tags.filter(tag => tag.toLowerCase().includes(value)).length) return emoji
                })
            return Emojies
        })
    }


    return (
        <>
            <div>
                <span onClick={handleToggleEmojiPicker} ref={openBtnRef}>
                    {children}
                </span>
                <div ref={pickerRef} className={`bg-white border rounded-lg max-w-[20rem] z-[999] p-3 absolute hidden`}>
                    <input type='search' className='border outline-none p-1 rounded-md w-full' placeholder='Search' onChange={handleSearchEmoji} />
                    <div className=' flex item-center gap-1 flex-wrap max-h-[15rem] overflow-auto'>
                        {
                            emojies.slice().map(emoji => {
                                return <span key={emoji.emoji} className='text-[25px] h-fit cursor-pointer transition-transform transform-gpu hover:scale-110' onClick={() => onClickEmoji(emoji)}>{emoji.emoji}</span>
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyEmojiPicker