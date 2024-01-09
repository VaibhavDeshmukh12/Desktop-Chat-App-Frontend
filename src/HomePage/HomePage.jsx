import { Grid } from '@mui/material'
import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import MiddlePart from '../components/MiddlePart/MiddlePart';
// import Reels from '../components/Reels/Reels';
// import CreateReelsForm from '../components/Reels/CreateReelsForm';
import Profile from '../components/Profile/Profile';
// import HomeRight from '../components/HomeRight/HomeRight';
// import { useSelector } from 'react-redux';

function HomePage() {

    // const location = useLocation();
    // const dispatch = useDispatch();
    // const jwt = localStorage.getItem("jwt");
    // const {auth} = useSelector(store=>store);

    // console.log('auth :>> ', auth);

    return (
        <div className='px-20'>
            <Grid container spacing={0}>
                <Grid item xs={0} lg={3}> 
                    <div className='sticky top-0 '>
                        <Sidebar />
                    </div>
                </Grid>
                <Grid lg={9} item className='flex justify-center' xs={12}>
                    <Routes>
                        <Route path='/' element={<MiddlePart />} />
                        {/* <Route path='/reels' element={<Reels />} />
                        <Route path='/create-reels' element={<CreateReelsForm />} /> */}
                        <Route path='/profile/:id' element={<Profile />} />
                    </Routes>
                </Grid>
                {/* {location.pathname==="/" && <Grid item lg={3} className='relative'>
                    <div className='sticky top-0 w-full'>
                        <HomeRight />
                    </div>
                </Grid>} */}
            </Grid>
        </div>
    )
}

export default HomePage
