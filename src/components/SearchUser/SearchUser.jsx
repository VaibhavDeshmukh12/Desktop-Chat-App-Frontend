import { Avatar, Card, CardHeader } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { searchUserAction } from '../../Redux/Auth/auth.action';
import { createChat } from '../../Redux/Message/Message.action';

function SearchUser() {

    const [username,setUsername] = useState('');
    const dispatch = useDispatch();
    const {auth,message} = useSelector(store=>store);

    const handleSearchUser = (e) => {
        setUsername(e.target.value)
        // console.log('username :>> ', username);
        dispatch(searchUserAction(username))
        
    }

    const handleClick = (id) => {
        dispatch(createChat({userId:id}));
    }

    return (
        <div>
            <div className='py-5 relative'>
                <input  type="text" className='bg-transparent border border-[#3b4054] outline-none w-full px-5 py-3 rounded-full' placeholder="Search User" onChange={(e)=>handleSearchUser(e)} />
            {
                username && (
                    auth.searchUser.map((item)=>
                        <Card key={item.id} className='absolute w-full z-10 top-[4.
                            5rem] cursor-pointer'>
                                <CardHeader onClick={() => {
                                    setUsername('')
                                    handleClick(item.id)
                                }}
                                avatar={<Avatar src='https://cdn.pixabay.com/photo/2023/12/20/07/04/sunset-8459057_640.jpg' />}
                                title={item.fname+" "+item.lname}
                                subheader={item.fname.toLowerCase()+"_"+item.lname.toLowerCase()}
                                />
                            </Card>
                    )
                )
            }
            </div>
        </div>
    )
}

export default SearchUser
