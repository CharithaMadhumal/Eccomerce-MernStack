import React, { useState } from 'react'
import { data, Link, useNavigate } from 'react-router-dom'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';



const OtpVerified = () => {

    const [data, setData] = useState(["","","","","",""])
    
    const navigate = useNavigate()



    const valideValue = data.every(el => el)

    const handleSubmit = async (e) =>{
        e.preventDefault()


        
        try {

            const response = await Axios ({
                ...SummaryApi.forgot_password_otp_verification,
                data : data
            })

            if(response.data.error){
                toast.error(response.data.message)
                
            }

            if(response.data.success){
                toast.success(response.data.message)
                setData({
                  
                    email: "",
                   
                    
                })
                navigate('/verify-forgot-password-otp')
            }
            
          
        } catch (error) {
            AxiosToastError(error)
        }

       

    }

    return (
        <section className='w-full container mx-auto px-2'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
                
                <p className='font-semibold text-lg '>Enter OTP</p>



                <form className='grid gap-2 py-4' onSubmit={handleSubmit}>
                   

                    <div className='grid gap-1'>
                        <label htmlFor='otp'>Enter your OTP :</label>
                        <div className='flex items-center gap-2 justify-between'>
                            {
                                data.map((element,index)=>{
                                    return(
                                        <input
                                            type="text"
                                            id='otp'
                                            
                                            className='bg-blue-50 w-full max-w-16 p-2 border rounded outline-none focus-within:border-yellow-500'
                                        
                                        />
                                    )
                                })
                            }
                        </div>
                       
                    </div>

                  

                   

                    <button disabled={!valideValue} className={`${valideValue ? "bg-green-600 hover:bg-green-700"  : "bg-gray-500" } text-white p-2 rounded mt-4 font-semibold`}>Verify Otp</button>
                </form>

                <p className='mt-2'>
                    Already have account ? <Link to={"/login"} className='font-semibold text-green-700 '>Login</Link>
                </p>
            </div>

        </section>
    )
}

export default OtpVerified

