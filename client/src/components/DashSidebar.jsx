import React, { useEffect, useState } from 'react'
import { FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'

export default function DashSidebar() {
    const location=useLocation();
    const[tab,setTab]=useState('');
    useEffect(()=>{
      const urlParams=new URLSearchParams(location.search);
      const tabFormUrl=urlParams.get('tab');
      if(tabFormUrl){
        setTab(tabFormUrl);
      }
    },[location.search])
  return (
    <div className='w-full md:w-56' >
        <div className='flex flex-col gap-2 text-lg p-4'>
            <Link to={"/dashboard?tab=profile"}  className={` p-2 rounded-lg flex items-center gap-2 ${
            tab === 'profile' ? 'bg-pink-400 text-black' : ''
          }`} name='profile'>
                <FaUser/>
                Profile
                <span className='text-white bg-black px-2 mx-2 text-sm rounded-md'>
                    user
                </span>
            </Link>
            <hr />
            <button className='flex items-center gap-2 p-2 rounded-lg '>
                <span className=' rounded-md' >
                    <FaSignOutAlt/>
                </span>
                Sign out
            </button>
        </div>
    </div>
  )
}
