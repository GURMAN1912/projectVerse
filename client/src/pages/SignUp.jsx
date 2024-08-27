import { set } from 'mongoose';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';
import { motion } from "framer-motion"

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
      return setErrorMessage("Enter all the feild...")
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
        setErrorMessage(data.message);
        setLoading(false)
      }
      if(res.ok){
        navigate(
          "sign-in"
        )
      }
    }
    catch(err){

    }
  }
  return (
    <div className=' min-h-screen mt-20'>
      <motion.div  initial={{ x: -500 }} animate={{ x: 0 }}
  transition={{ type: "spring", stiffness: 100 }} className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1'>
        <Link to={"/"}>
                <h1 className='font-bold text-5xl flex flex-wrap'>
                    <span className='text-pink-500'>
                    Gurman's
                    </span>
                    <span className='text-pink-400'>
                        blog
                    </span>
                </h1>
            </Link>
            <p className='text-sm mt-5'>
              This is a demo project .you can sign up with your email and password
            </p>
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
            <button disabled={loading} className='bg-pink-500 text-white font-semibold p-2 rounded-lg shadow-md' type='submit'>
              {loading ? "Loading...":"Sign up"}
            </button>
            <OAuth/>
          </form>
          <div className='text-sm flex gap-2 mt-2'>
            <span>
              Have an account?
            </span>
            <Link className='underline text-pink-800'  to={'/sign-in'}>
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
