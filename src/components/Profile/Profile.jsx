import { Avatar, Box, Button, Card, Tab, Tabs } from '@mui/material';
import React,{useEffect} from 'react'
import PostCard from '../Post/PostCard'
// import UserReelCard from '../Reels/UserReelCard';
import { useSelector,useDispatch } from 'react-redux';
import ProfileModal from './ProfileModel';
import { getUsersPostAction } from '../../Redux/Post/post.action';

const tabs = [
    { value: "post", name: "Post" },
    // { value: "reels", name: "Reels" },
    // { value: "repost", name: "Repost" },
]
// const savedPost = [1, 1, 1, 1]
// const reels = [1, 1, 1]

function Profile() {
    const [open, setOpen] = React.useState(false);
    const handleOpenProfileModel = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { auth,post } = useSelector(store => store);
    const [value, setValue] = React.useState('post');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    // console.log('post.posts :>> ', post.posts);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getUsersPostAction(auth.user.id));
    })

    return (
        <Card className='my-10 w-[70%]'>
            <div className="rounded-md">
                <div className='h-[12rem]'>
                    <img
                        className='w-full h-full rounded-t-md'
                        src="https://cdn.pixabay.com/photo/2017/12/18/01/41/sea-3025268_640.jpg" alt="" />
                </div>
                <div className='px-5 flex justify-between items-start mt-5 h-[5rem]'>
                    <Avatar
                        className='transform -translate-y-24'
                        sx={{ width: "10rem", height: "10rem" }} src='https://cdn.pixabay.com/photo/2017/08/23/11/45/cassette-2672634_640.png' />

                    <Button sx={{ borderRadius: "20px" }} variant='outlined' onClick={handleOpenProfileModel} >Edit Profile</Button> 
                    {/* {: <Button sx={{ borderRadius: "20px" }} variant='outlined'>Follow</Button>} */}

                </div>
                <div className='p-5'>
                    <div>
                        <h1 className='py-1 font-bold text-xl'>{auth.user?.fname + " " + auth.user?.lname}</h1>
                        <p>@{auth.user?.fname.toLowerCase() + "_" + auth.user?.lname.toLowerCase()}</p>
                    </div>

                    <div className='flex gap-5 items-center py-3'>
                        <span>{post.posts.length} Posts</span>
                        <span>35 followers</span>
                        <span>5 following</span>
                    </div>
                    <div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, possimus.</p>
                    </div>
                </div>
                <section>
                    <Box sx={{ width: '100%', borderBottom: 1, borderColor: "divider" }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            textColor="primary"
                            indicatorColor="secondary"
                            aria-label="secondary tabs example"
                        >
                            {tabs.map((item) => <Tab value={item.value} key={item.pid} label={item.name} wrapped />)}
                        </Tabs>
                    </Box>
                    <div className="flex justify-center">
                        {<div className='space-y-5 w-[70%] my-10'>
                            {post.posts.map((item) => <div key={item.pid} className='border border-slate-100 rounded-md' >
                                <PostCard item={item} />
                            </div>)}
                        </div> 
                        // : value === 'reels' ? <div className='flex justify-center my-10 flex-wrap gap-2 '>
                        //     {reels.map((item) => <UserReelCard />)}
                        // </div> : (
                        //     <div>Repost</div>
                        // )
                        }
                    </div>
                </section>
            </div>
            <section>
                <ProfileModal open={open} handleClose={handleClose} />
            </section>
        </Card>
    )
}

export default Profile



// value === 'saved' ? <div className='space-y-5 w-[70%] my-10'>
//                             {savedPost.map((item) => <div key={item.pid} className='border border-slate-100 rounded-md' >
//                                 <PostCard item={item} />
//                             </div>)}
//                         </div> : 