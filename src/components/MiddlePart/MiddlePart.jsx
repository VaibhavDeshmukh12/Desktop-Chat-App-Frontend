import { Avatar, Card, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
// import AddIcon from '@mui/icons-material/Add';
// import StoryCircle from './StoryCircle';
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import ArticleIcon from '@mui/icons-material/Article';
import PostCard from '../Post/PostCard';
import CreatePostModel from '../CreatePost/CreatePostModel';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPostAction } from '../../Redux/Post/post.action';

function MiddlePart() {

  const dispatch = useDispatch();
  // const story=[11,2,3,4,5]
  // const posts=[11,2,3,4,5]
  const [openCreatePostModel,setOpenCreatePostModel] = useState(false);
  const {post} = useSelector(store=>store);

  // console.log('post :>> ', auth);

  const handleCloseCreatePostModel = ()=>{
    setOpenCreatePostModel(false);
  }

  const handleOpenCreatePostModel= () =>{
    setOpenCreatePostModel(true);
    console.log(' handleOpenCreatePostModel');
  }

  useEffect(()=>{
    dispatch(getAllPostAction());
  },[post.newComment,dispatch]);

  return (
    <div className='px-20' >
      {/* <section className='flex items-center mt-4 rounded-b-md'>
        <div className='flex flex-col cursor-pointer items-center mr-4'>
          <Avatar
            sx={{ width: "5rem", height: "5rem" }}
          // src='https://cdn.pixabay.com/photo/2017/12/01/08/02/paint-2990357_640.jpg'
          >
            <AddIcon sx={{ fontSize: "3rem" }} />
          </Avatar>
          <p>NEW</p>
        </div>
        {
          story.map((item,index)=> <StoryCircle key={index} />)
        }
      </section> */}

      <Card className='p-5 mt-5'>
        <div className='flex justify-between'>
          <Avatar />
          <input
          onClick={handleOpenCreatePostModel}
          readOnly type="text" className='outline-none w-[90%] rounded-full px-5 bg-slate-100 bg-transparent border-[#3b4054] border ' />
        </div>
        <div className='flex justify-center space-x-9 mt-5'>
          <div className='flex items-center'>

            <IconButton color='primary' onClick={handleOpenCreatePostModel} >
              <ImageIcon />
            </IconButton>

            <span>Media</span>

          </div>
          <div className='flex items-center'>
            <IconButton color='primary' onClick={handleOpenCreatePostModel} >
              <VideocamIcon />
            </IconButton>

            <span>Video</span>
          </div>
          <div className='flex items-center'>
            <IconButton color='primary' onClick={handleOpenCreatePostModel} >
              <ArticleIcon />
            </IconButton>

            <span>Write Article</span>
          </div>
        </div>
      </Card>
      <div className='mt-5 space-y-5'>
        {post.posts.map((item)=><PostCard key={item.pid} item={item} />)}
      </div>
      <div>
        <CreatePostModel handleClose={handleCloseCreatePostModel} open={openCreatePostModel} />
      </div>
    </div>
  )
}

export default MiddlePart
