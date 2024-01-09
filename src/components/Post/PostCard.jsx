import { Avatar, Card, CardActions, CardContent, CardHeader, Divider, IconButton, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useDispatch, useSelector } from 'react-redux';
import { createCommentAction, deletePostAction, likePostAction } from '../../Redux/Post/post.action';
import { isLikedByReqUSer } from '../../utils/isLikedReqUser';
import {  Button, Menu, MenuItem } from '@mui/material'

function PostCard({ item }) {

    // console.log('item :>> ', item);
    const [showComments, SetShowComments] = useState(false);
    const dispatch = useDispatch();
    const handleShowComments = () => SetShowComments(!showComments);
    const { auth } = useSelector(state => state)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleCreateComment = (content) => {
        const reqData = {
            pid: item.pid,
            data: {
                content
            }
        }
        dispatch(createCommentAction(reqData));

    }

    const handleLikePost = () => {
        dispatch(likePostAction(item.pid))
    }


    const handleClose = () => {
        // console.log('e :>> ', e);
        dispatch(deletePostAction(item.pid))
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <Card className=''>

            <CardHeader
            avatar={
                    <Avatar sx={{ bgcolor: red[500], color: 'white' }} aria-label="recipe">
                        {item.user.fname.charAt(0).toUpperCase() + ''
                            + item.user.lname.charAt(0).toUpperCase()}
                    </Avatar>
                }
                action={
                    <div>
                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <MoreVertIcon />
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={(e) => handleClose(e)}>Delete</MenuItem>
                        </Menu>
                    </div>
                }
                title={item.user?.fname + " " + item.user?.lname}
                subheader={`@${item.user?.fname.toLowerCase() + "_" + item.user?.lname.toLowerCase()}`}
            />
            <img src={item.image} className='w-full max-h-[30rem] object-top object-cover' alt="" />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {item.caption}
                </Typography>
            </CardContent>

            <CardActions className='flex justify-between' disableSpacing>
                <div>
                    <IconButton onClick={handleLikePost}>
                        {isLikedByReqUSer(auth.user.id, item) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                    <IconButton>
                        {<ShareIcon />}
                    </IconButton>
                    <IconButton onClick={handleShowComments}>
                        {<ChatBubbleOutlineIcon />}
                    </IconButton>
                </div>

                <div>
                    <IconButton >
                        {false ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                    </IconButton>
                </div>

            </CardActions>

            {showComments && <section>
                <div className='flex items-center space-x-5 mx-3 my-5'>

                    <Avatar sx={{}} />
                    <input onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            handleCreateComment(e.target.value);
                            // console.log('enter pressed--', e.target.value);
                            e.target.value=""
                        }
                    }} className='w-full outline-none bg-transparent border border-[#3b4054] rounded-full px-5 py-2' type="text" placeholder="Write your comment here.." />

                </div>
                <Divider />
                <div className='mx-3 space-y-2 my-5 text-xs'>
                    {item.comments.map((comment) =>
                        <div className='flex items-center space-x-5'>
                            <Avatar sx={{ height: "2rem", width: "2rem", fontSize: ".8rem" }}>
                                {comment.user.fname[0]}
                            </Avatar>
                            <p>{comment.content}</p>
                        </div>)}
                </div>
            </section>}

        </Card>
    )
}

export default PostCard
