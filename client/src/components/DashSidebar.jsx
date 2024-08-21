import React, { useEffect, useState } from 'react'
import { FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../redux/user/userSlice';
export default function DashSidebar() {
    const location=useLocation();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const[tab,setTab]=useState('');
    useEffect(()=>{
      const urlParams=new URLSearchParams(location.search);
      const tabFormUrl=urlParams.get('tab');
      if(tabFormUrl){
        setTab(tabFormUrl);
      }
    },[location.search])
    const handleSignOut=async()=>{
      try{
        const res=await fetch("/api/user/sign-out",{
          method:'POST',
        })
        const data=await res.json();
        console.log(data)
        if(!res.ok){
          toast.error(data.message);
        }
        else{
          toast.success("sign out successful")
          dispatch(signOut());
          navigate("/sign-in")
        }
      }
      catch(error){
          toast.error(error.message);
      }
    }
  return (
    <div className='w-full ' >
        <div className='flex flex-col gap-2 text-lg p-4'>
            <Link to={"/dashboard?tab=profile"}  className={` p-2 rounded-lg flex items-center gap-2 ${
            tab === 'profile' ? 'bg-pink-500 text-black' : ''
          }`} name='profile'>
                <FaUser/>
                Profile
                <span className='text-white bg-black px-2 mx-2 text-sm rounded-md'>
                    user
                </span>
            </Link>
            <hr />
            <button className='flex items-center gap-2 p-2 rounded-lg  ' onClick={handleSignOut}>
                <span className=' rounded-md' >
                    <FaSignOutAlt/>
                </span>
                Sign out
            </button>
        </div>
    </div>
  )
}
