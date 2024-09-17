import { set } from 'mongoose';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';
import { motion } from "framer-motion"
import image  from "../assets/Coding.png"
import { toast } from 'react-toastify';

export default function SignUp() {
  const [formData,setFormData]=useState({})
  const [errorMessage,setErrorMessage]=useState(null);
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value.trim()})
    console.log(formData)
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!formData.username ||!formData.email ||!formData.password)
    {
      toast.error("Enter all the feild...")
    }
    if(formData.username.length<7 ||formData.username.length>20){
      toast.error("Username must be between 7-20 characters")
    }
    try{
      setErrorMessage(null)
      setLoading(true);
      const res=await fetch("api/auth/sign-up",{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData)
      })
      const data=await res.json();
      setLoading(false)
      if(!data.success){
        toast.error(data.message);
        setLoading(false)
      }
      if(res.ok){
        navigate(
          "/sign-in"
        )
      }
    }
    catch(err){
      toast.error("Something went wrong")
    }
  }
  return (
    <div className=' min-h-screen pt-20 bg-background text-text gap-4'>
      <motion.div  initial={{ x: -500 }} animate={{ x: 0 }}
  transition={{ type: "spring", stiffness: 100 }} className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1 gap-4'>
        <Link to={"/"}>
        <h1 className='font-bold text-5xl   flex flex-wrap gradienttext'>
                    ProjectVerse
                </h1>
            </Link>
            <p className='text-md mt-5'>
              sign up with your email and password to get started
            </p>
            <div className='py-4'>
              <img src={image} alt="" className='mx-auto h-48' />
            </div>
        </div>
        <div className='flex-1'>
          <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
            <div className='flex flex-col'>
            <label htmlFor="username">Username</label>
            <input type="text" placeholder='username..'id='username' onChange={handleChange} />
            </div>
            <div className='flex flex-col gap-1'>
            <label htmlFor="username">Email</label>
            <input type="text"  placeholder='email..' id='email' onChange={handleChange} />
            </div>
            <div className='flex flex-col'>
            <label htmlFor="username">Password</label>
            <input  type="password" placeholder='password..'id='password' onChange={handleChange} />
            </div>
            <button disabled={loading} className='bg-primary text-white font-semibold p-2 rounded-lg shadow-md' type='submit'>
              {loading ? "Loading...":"Sign up"}
            </button>
            <OAuth/>
          </form>
          <div className='text-sm flex gap-2 mt-2'>
            <span>
              Have an account?
            </span>
            <Link className='underline text-linkHover'  to={'/sign-in'}>
              Sign in
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
