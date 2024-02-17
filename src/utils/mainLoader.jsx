import React from 'react'
import logo from "../assets/logo1.png"
import { Spinner } from "@nextui-org/react";


const MainLoader = () => {
    return (
        <>
            <div className='h-[90vh] flex gap-3 flex-col items-center justify-center'>
                <img src={logo} width={150} />
                <Spinner color="secondary" />
            </div>

            <div className='text-center'>
                <span>Made with ❤️ by <span className='font-semibold'>Ajay Neman</span></span>
            </div>
        </>
    )
}

export default MainLoader