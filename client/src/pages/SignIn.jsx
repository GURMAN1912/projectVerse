import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignIn() {
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
    if(!formData.email ||!formData.password)
    {
      return setErrorMessage("Enter all the feild...")
    }
    try{
      setErrorMessage(null)
      setLoading(true);
      const res=await fetch("api/auth/sign-in",{
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
          "/"
        )
      }
    }
    catch(err){

    }
  }
  return (
    <div className=' min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1'>
        <Link to={"/"}>
                <h1 className='font-bold text-5xl flex flex-wrap'>
                    <span className='text-cyan-400'>
                    Gurman's
                    </span>
                    <span className='text-cyan-300'>
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
            <button disabled={loading} className='bg-cyan-300 font-semibold p-2 rounded-lg shadow-md' type='submit'>
              {loading ? "Loading...":"Sign in"}
            </button>
          </form>
          <div className='text-sm flex gap-2 mt-2'>
            <span>
              Do not Have an account?
            </span>
            <Link className='underline text-cyan-800'  to={'/sign-up'}>
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
