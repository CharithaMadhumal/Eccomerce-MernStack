import React, { useState } from 'react'
import { data, Link, useNavigate } from 'react-router-dom'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import toast from 'react-hot-toast';

import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';



const Register = () => {

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const valideValue = Object.values(data).every(el => el)

    const handleSubmit = async (e) =>{
        e.preventDefault()

        if(data.password !== data.confirmPassword){
            toast.error("Password and confirm password not match")
            return
        }

        
        try {

            const response = await Axios ({
                ...SummaryApi.register,
                data : data
            })

            if(response.data.error){
                toast.error(response.data.message)
                
            }

            if(response.data.success){
                toast.success(response.data.message)
                setData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                })
                navigate('/')
            }
            
          
        } catch (error) {
            AxiosToastError(error)
        }

       

    }

    return (
        <section className='w-full container mx-auto px-2'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
                <p>Welcome to Binkeyit</p>




                <form className='grid gap-2 mt-6' onSubmit={handleSubmit}>
                    <div className='grid gap-1'>
                        <label htmlFor='name'>Name :</label>
                        <input
                            type="text"
                            id='name'
                            autofocus
                            className='bg-blue-50 p-2 border outline-none focus-within:border-blue-500'
                            name='name'
                            value={data.name}
                            onChange={handleChange}
                            placeholder='Enter your name'
                        />
                    </div>

                    <div className='grid gap-1'>
                        <label htmlFor='email'>Email :</label>
                        <input
                            type="email"
                            id='email'
                            autofocus
                            className='bg-blue-50 p-2 border rounded outline-none focus-within:border-blue-500'
                            name='email'
                            value={data.email}
                            onChange={handleChange}
                            placeholder='Enter your email'
                        />
                    </div>

                    <div className='grid gap-1'>
                        <label htmlFor='password'>Password :</label>
                        <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-blue-500'>
                            <input
                                type={showPassword ? "text" : "password"}
                                id='password'
                                autofocus
                                className='w-full outline-none'
                                name='password'
                                value={data.password}
                                onChange={handleChange}
                                placeholder='Enter your password'
                            />

                            <div onClick={() => setShowPassword(preve => !preve)} className='cursor-pointer'>

                                {
                                    showPassword ? (
                                        <FaRegEye />
                                    ) : (
                                        <FaRegEyeSlash />
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <div className='grid gap-1'>
                        <label htmlFor='confirmPassword'>Confirm Password :</label>
                        <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-blue-500'>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id='confirmPassword'
                                autofocus
                                className='w-full outline-none'
                                name='confirmPassword'
                                value={data.confirmPassword}
                                onChange={handleChange}
                                placeholder='Enter your confirm password'
                            />

                            <div onClick={() => setShowConfirmPassword(preve => !preve)} className='cursor-pointer'>

                                {
                                    showConfirmPassword ? (
                                        <FaRegEye />
                                    ) : (
                                        <FaRegEyeSlash />
                                    )
                                }
                            </div>
                        </div>
                            </div>

                    <button disabled={!valideValue} className={`${valideValue ? "bg-green-600 hover:bg-green-700"  : "bg-gray-500" } text-white p-2 rounded mt-4 font-semibold`}>Register</button>
                </form>

                <p className='mt-2'>
                    Already have an account ? <Link to={"/login"} className='font-semibold text-green-700'>Login</Link>
                </p>
            </div>

        </section>
    )
}

export default Register
