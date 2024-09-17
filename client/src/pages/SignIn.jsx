import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInFailure,signInStart,signInSuccess } from '../redux/user/userSlice';
import {useDispatch,useSelector} from "react-redux"
import OAuth from '../components/OAuth';
import { motion } from "framer-motion"
import image  from "../assets/Coding.png"

export default function SignIn() {
  const [formData,setFormData]=useState({})
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const{loading,error:errorMessage}=useSelector(state=>state.user);
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value.trim()})
    console.log(formData)
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!formData.email ||!formData.password)
    {
      dispatch(signInFailure("Enter all the feild..."));
    }
    try{
      dispatch(signInStart())
      const res=await fetch("api/auth/sign-in",{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData)
      })
      const data=await res.json();
      if(!data.success){
        dispatch(signInFailure(data.message));
      }
      if(res.ok){
        dispatch(signInSuccess(data))
        toast.warning("Please update your profile to get better Profile Page")
        navigate(
          "/"
        )
      }
    }
    catch(err){
      signInFailure(err.message)
    }
  }
  return (
    <div className=' min-h-screen pt-20 bg-background'>
      <motion.div  initial={{ x: -500 }} animate={{ x: 0 }}
  transition={{ type: "spring", stiffness: 100 }} className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1'>
        <Link to={"/"}>
        <h1 className='font-bold text-lg md:text-2xl sm:text-3xl flex flex-wrap gradienttext'>
                    ProjectVerse
                </h1>
            </Link>
            <p className='text-sm mt-5 text-text'>
              This is a demo project .you can sign up with your email and password
            </p>
            <div  className='py-4'>
              <img src={image} alt="" className='mx-auto h-48' />
            </div>

        </div>
        <div className='flex-1  text-text'>
          <form className='flex flex-col gap-5 text-text' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-1'>
            <label htmlFor="username" >Email</label>
            <input type="text"  placeholder='email..' id='email' onChange={handleChange} />
            </div>
            <div className='flex flex-col'>
            <label htmlFor="username">Password</label>
            <input  type="password" placeholder='password..'id='password' onChange={handleChange} />
            </div>
            <button disabled={loading} className=' bg-primary font-semibold p-2 rounded-lg shadow-md' type='submit'>
              {loading ? "Loading...":"Sign in"}
            </button>
            <OAuth/>
          </form>
          <div className='text-sm  flex gap-2 mt-2'>
            <span>
              Do not Have an account?
            </span>
            <Link className='underline text-linkHover'  to={'/sign-up'}>
              Sign up
            </Link>
          </div>
          {errorMessage&&(
            <span className='text-red-600 text-sm'>
              {errorMessage}
            </span>
          )}
        </div>
      </motion.div>
    </div>
  )
}
