import React, { useEffect, useMemo, useState } from 'react'
import {useDispatch,useSelector} from 'react-redux';
import { useTable } from "react-table";
import Cards from './Cards';
import { FaArrowAltCircleUp } from "react-icons/fa"
export default function DashPosts() {
    const {currentUser}=useSelector(state=>state.user);
    const[posts,setPosts]=useState([]);
    const[lastMonthPosts,setLastMonthPosts]=useState(0);
    console.log(currentUser._id);
    useEffect(()=>{
        const fetchPosts=async()=>{
            try{
                const res=await fetch(`/api/posts/getposts?userId=${currentUser._id}`,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json'
                    }
                })
                const data=await res.json();
                if(res.ok){
                    setPosts(data.posts);
                    setLastMonthPosts(data.lastMonthPosts);
                }
                console.log(data.posts);
            }
            catch(error){
                console.log(error.message)
            }
        }
            fetchPosts();

    },[currentUser._id],posts)  
     
   
  return (
    <div className=' lg:mx-auto w-full px-4 py-4 '>
        <div className='grid lg:grid-cols-3 grid-cols-1 gap-8'>
        <div className='bg-borderFocus text-black px-3 py-4 rounded-lg'>
            <h2 className='text-4xl font-semibold'>
                Total Posts:{posts.length}
            </h2>
            <p className='text-lg font-semibold inline'>
                Last Month Posts:{lastMonthPosts}
                <FaArrowAltCircleUp className='text-green-800 inline'/>
            </p>
        </div>
        <div className='bg-borderFocus text-black px-3 py-4 rounded-lg'>
            <h2 className='text-4xl font-semibold'>
                Total followers:{posts.length}
            </h2>
            <p className='text-lg font-semibold inline'>
                new followers:{lastMonthPosts}
                <FaArrowAltCircleUp className='text-green-800 inline'/>
            </p>
        </div>
        <div className='bg-borderFocus text-black px-3 py-4 rounded-lg'>
            <h2 className='text-4xl font-semibold'>
                Total impressions:{posts.length}
            </h2>
            <p className='text-lg font-semibold inline'>
                new impressions:{lastMonthPosts}
                <FaArrowAltCircleUp className='text-green-800 inline'/>
            </p>
        </div>
        </div>
    <h1 className='text-5xl my-5 font-bold text-center'>Your Posts</h1>
    <div className=' grid grid-cols-1 lg:grid-cols-3 p-3 gap-10 md:grid-cols-2 overflow-y-auto max-h-[calc(100vh-240px)]  scrollbar scrollbar-thumb-transparent scrollbar-track-transparent'>
          {posts.map((post)=><Cards post={post} key={post._id} />)} 
    </div>
    {posts.length===0 && <h1 className='text-3xl text-center font-semibold'>No Posts Yet.....</h1>}
    </div>
  )
}
