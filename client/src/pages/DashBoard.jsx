import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';

export default function DashBoard() {
  const location=useLocation();
  const[tab,setTab]=useState('');
  useEffect(()=>{
    const urlParams=new URLSearchParams(location.search);
    const tabFormUrl=urlParams.get('tab');
    if(tabFormUrl){
      setTab(tabFormUrl);
    }
    console.log(tab);
  },[location.search])
  return (
    <div className='min-h-screen  flex flex-col md:flex-row text-text bg-background'>
        <div className='md:max-w-md'>
        <DashSidebar/>
        </div>
        {tab==='profile' && <DashProfile/>}
        {tab==='posts' && <DashPosts/>}
    </div>
  )
}
