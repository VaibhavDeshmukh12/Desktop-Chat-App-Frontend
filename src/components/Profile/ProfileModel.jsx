import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Avatar, Button, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { updateProfileAction } from '../../Redux/Auth/auth.action';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    overflow: 'scroll-y',
    outline: "none",
    p: 2,
    borderRadius: 3,
};

export default function ProfileModal({ open, handleClose }) {

    const dispatch = useDispatch();

    // const handleSubmit=(values)=>{
    //     console.log('values :>> ', values);
    // }

    const formik = useFormik({
        initialValues: {
            fname: '',
            lname: ''
        },
        onSubmit: (values,) => {
            console.log('values :>> ', values);
            dispatch(updateProfileAction(values))
        }
    });

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <IconButton onClick={handleClose}>
                                    <CloseIcon />
                                </IconButton>
                                <p>Edit Profile</p>
                            </div>
                            <Button type='submit' >Save</Button>
                        </div>
                        <div>
                            <div className='h-[15rem]'>
                                <img className='w-full h-full rounded-t-md'
                                    src="https://cdn.pixabay.com/photo/2023/09/05/18/18/eurasian-pygmy-owl-8235624_640.jpg" alt="" />
                            </div>
                            <div className='pl-5'>
                                <Avatar
                                    className='transform -translate-y-24'
                                    sx={{ width: '10rem', height: "10rem" }}
                                    src='https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_640.png'
                                />
                            </div>
                        </div>
                        <div className='space-y-3'>
                            
                            <TextField
                                fullWidth
                                id='fname'
                                name='fname'
                                label='First Name'
                                value={formik.values.fname}
                                onChange={formik.handleChange}
                            />
                            <TextField
                                fullWidth
                                id='lname'
                                name='lname'
                                label='Last Name'
                                value={formik.values.lname}
                                onChange={formik.handleChange}
                            />
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}