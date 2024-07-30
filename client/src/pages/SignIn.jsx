import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInFailure,signInStart,signInSuccess } from '../redux/user/userSlice';
import {useDispatch,useSelector} from "react-redux"
import OAuth from '../components/OAuth';
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
    <div className=' min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
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
            <div className='flex flex-col gap-1'>
            <label htmlFor="username">Email</label>
            <input type="text"  placeholder='email..' id='email' onChange={handleChange} />
            </div>
            <div className='flex flex-col'>
            <label htmlFor="username">Password</label>
            <input  type="password" placeholder='password..'id='password' onChange={handleChange} />
            </div>
            <button disabled={loading} className=' text-white bg-pink-500 font-semibold p-2 rounded-lg shadow-md' type='submit'>
              {loading ? "Loading...":"Sign in"}
            </button>
            <OAuth/>
          </form>
          <div className='text-sm flex gap-2 mt-2'>
            <span>
              Do not Have an account?
            </span>
            <Link className='underline text-pink-800'  to={'/sign-up'}>
              Sign up
            </Link>
          </div>
          {errorMessage&&(
            <span className='text-red-600 text-sm'>
              {errorMessage}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
