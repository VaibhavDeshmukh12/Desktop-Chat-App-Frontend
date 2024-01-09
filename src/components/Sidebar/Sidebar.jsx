import React from 'react'
import { navigationMenu } from './SidebarNavigation'
import { Avatar, Button, Card, Divider, Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const { auth } = useSelector(store => store);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (e) => {
        // console.log('e :>> ', e);
        if (e.target.innerText === "logout") {
            navigate('/logout')
        }
        setAnchorEl(null);
    };

    const handleNavigate = (item) => {
        if (item.title === 'Profile') {
            navigate(`/profile/${auth.user?.id}`)
        }
        if (item.title === 'Message') {
            navigate('/message')
        }
        if (item.title === 'Home') {
            navigate('/')
        }
    }



    return (
        <Card className='card h-screen flex flex-col justify-between py-5'>
            <div className='space-y-8 pl-5'>
                <div className=''>
                    <span className='logo font-bold text-xl'>VibeVerse</span>
                </div>
                <div className="space-y-8">
                    {
                        navigationMenu.map((item, index) => <div key={index} onClick={() => handleNavigate(item)} className='flex cursor-pointer items-center space-x-3'>
                            {item.icon}
                            <p className='text-xl'>{item.title}</p>
                        </div>
                        )
                    }
                </div>
            </div>
            <div>
                <Divider />
                <div className='pl-5 flex items-center justify-between pt-5'>
                    <div className='flex items-center space-x-3'>
                        <Avatar src='https://cdn.pixabay.com/photo/2014/04/02/14/11/male-306408_640.png' />
                        <div>
                            <p className='font-bold'>{auth.user.fname + " " + auth.user.lname}</p>
                            <p className='opacity-70'>@{auth.user.fname.toLowerCase() + "_" + auth.user.lname.toLowerCase()}</p>
                        </div>
                    </div>
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
                            <MenuItem name="logout" onClick={(e) => handleClose(e)}>Logout</MenuItem>
                        </Menu>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default Sidebar
