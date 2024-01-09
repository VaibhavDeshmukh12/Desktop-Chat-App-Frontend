import { Avatar, Button, CardHeader } from '@mui/material'
import { red } from '@mui/material/colors'
import React from 'react'
function PopularUserCard() {
    return (
        <div>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <Button size='small'>Follow</Button>
                }
                title="Code with me"
                subheader="@codewithme"
            />
        </div>
    )
}

export default PopularUserCard
