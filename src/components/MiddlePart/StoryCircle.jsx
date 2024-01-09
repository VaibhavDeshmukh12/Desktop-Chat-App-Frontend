import { Avatar } from '@mui/material'
import React from 'react'

function StoryCircle() {
    return (
        <div>
            <div className='flex flex-col cursor-pointer items-center mr-4'>
                <Avatar
                    sx={{ width: "5rem", height: "5rem" }}
                src='https://cdn.pixabay.com/photo/2017/12/01/08/02/paint-2990357_640.jpg'
                >
                </Avatar>
                <p>Vaibhav</p>
            </div>
        </div>
    )
}

export default StoryCircle
