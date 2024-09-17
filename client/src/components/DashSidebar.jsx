import React, { useEffect, useState } from 'react'
import { FaSignOutAlt, FaUser, FaWindows } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../redux/user/userSlice';
export default function DashSidebar() {
   const {currentUser}=useSelector((state)=>state.user);
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
    <div className='bg-gray-900 text-text p-4'>
      <h1 className='font-semibold mb-4'>Welcome {currentUser.username}</h1>
      <ul className='flex flex-col gap-4'>
        <li>
        <Link to={"/dashboard?tab=profile"}  className={` p-2 rounded-lg flex items-center gap-2 ${
            tab === 'profile' ? 'bg-borderFocus text-black' : ''
          }`} name='profile'>
                <FaUser/>
                Profile
            </Link>
        </li>
        <li>
        <Link to={"/dashboard?tab=posts"}  className={` p-2 rounded-lg flex items-center gap-2 ${
            tab === 'posts' ? 'bg-borderFocus text-black' : ''
          }`} name='posts'>
                <FaWindows/>
                Posts  
            </Link>
        </li>
        <li>
        <button className='flex items-center gap-2 px-2 rounded-lg   ' onClick={handleSignOut}>
                <span className=' rounded-md' >
                    <FaSignOutAlt/> 
                </span>
                Signout
            </button>
        </li>
      </ul>
    </div>
    
  )
}
{/* <div className='w-full px-4   py-2 bg-background border border-r-secondary border-t-0 border-b-0 border-l-0  border-r-2 text-text shadow-gray-50 md:min-h-screen' >
        <div className='flex flex-col gap-2 text-lg '>
            <Link to={"/dashboard?tab=profile"}  className={` p-2 rounded-lg flex items-center gap-2 ${
            tab === 'profile' ? 'bg-borderFocus text-black' : ''
          }`} name='profile'>
                <FaUser/>
                Profile
            </Link>
            <Link to={"/dashboard?tab=posts"}  className={` p-2 rounded-lg flex items-center gap-2 ${
            tab === 'posts' ? 'bg-borderFocus text-black' : ''
          }`} name='posts'>
                <FaWindows/>
                Posts  
            </Link>
            <hr />
            <button className='flex items-center gap-2 px-2 rounded-lg   ' onClick={handleSignOut}>
                <span className=' rounded-md' >
                    <FaSignOutAlt/>
                </span>
                Signout
            </button>
        </div>
    </div> */}
