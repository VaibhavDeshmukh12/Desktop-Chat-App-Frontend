import { Button, TextField } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import * as Yup from "yup"
import { useDispatch } from 'react-redux';
import { registerUserAction } from '../../Redux/Auth/auth.action';
import { useNavigate } from 'react-router-dom';

const initialValues = { fname:"",lname:"",email: "", password: "",gender:"" }

const validationSchema = {
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required")
}

function Register() {

    const navigate = useNavigate();

    const [gender, setGender] = useState("");
    const dispatch = useDispatch()

    const handleSubmit = (values) => {
        values.gender = gender;
        dispatch(registerUserAction({data:values}))
        // console.log("handleSubmit: ", values)
    }

    const handleChange =(e)=>{
        setGender(e.target.value)
    }

    return (
        <>
            <Formik onSubmit={handleSubmit} initialValues={initialValues}
            // validationSchema={validationSchema}
            >
                <Form className='space-y-5'>
                    <div className='space-y-5'>

                        <div>
                            <Field as={TextField} name="fname" type="text" variant="outlined" fullWidth placeholder="First Name" />
                            <ErrorMessage name='fname' component="div" className='text-red-500' />
                        </div>

                        <div>
                            <Field as={TextField} name="lname" type="text" variant="outlined" fullWidth placeholder="Last Name" />
                            <ErrorMessage name='lname' component="div" className='text-red-500' />
                        </div>

                        <div>
                            <Field as={TextField} name="email" type="email" variant="outlined" fullWidth placeholder="Email" />
                            <ErrorMessage name='email' component="div" className='text-red-500' />
                        </div>

                        <div>
                            <Field as={TextField} name="password" type="password" variant="outlined" fullWidth placeholder="Password" />
                            <ErrorMessage name='password' component="div" className='text-red-500' />
                        </div>

                        <RadioGroup
                            row
                            aria-labelledby="gender"
                            name="gender"
                            onChange={handleChange}
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <ErrorMessage name='gender' component="FormControlLabel" className='text-red-500' />
                        </RadioGroup>

                        <Button sx={{ padding: ".8rem 0rem" }} fullWidth type="submit" variant='contained' color='primary' >Register</Button>

                    </div>
                </Form>
            </Formik>
            <div className='flex gap-2 items-center justify-center pt-5'>
                <p>If you have already account ? </p>
                <Button onClick={()=>navigate("/login")}>Login</Button>
            </div>
        </>
    )
}

export default Register
