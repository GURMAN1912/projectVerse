import React, { useEffect, useMemo, useState } from 'react'
import {useDispatch,useSelector} from 'react-redux';
import { useTable } from "react-table";
import Cards from './Cards';
import { FaArrowAltCircleUp } from "react-icons/fa"
import { Link } from 'react-router-dom';
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
    var impression=0;  
    for(let i=0;i<posts.length;i++){
        impression=posts[i].comments.length+posts[i].likes.length;
    }
  return (
    <div className=' bg-background lg:mx-auto w-full px-4 py-4 text-text '>
        <h1 className='text-5xl p-4 flex mb-2 justify-center'>Profile details </h1>
        <div className='grid lg:grid-cols-3 grid-cols-1 gap-8'>
        <div className='bg-gradient-to-br from-orange-300 to-orange-400 text-black  px-3 py-4 rounded-lg'>
            <h2 className='text-4xl font-semibold'>
                Total Posts:{posts.length}
            </h2>
            <p className='text-lg font-semibold inline'>
                Last Month Posts:{lastMonthPosts}
                <FaArrowAltCircleUp className='text-green-800 inline'/>
            </p>
        </div>
        <div className='bg-gradient-to-br from-orange-300 to-orange-400 text-black  px-3 py-4 rounded-lg'>
            <Link to={"/user/followers"} className='text-4xl font-semibold'>
                Total followers:{currentUser.followers.length}
            </Link>
        </div>
        <div className='bg-gradient-to-br from-orange-300 to-orange-400 text-black px-3 py-4 rounded-lg'>
            <h2 className='text-4xl font-semibold'>
                Total impressions:{impression}   
            </h2>
            
        </div>
        </div>
    <h1 className='text-4xl my-5 font-bold text-center'>Your Posts</h1>
    <div className='  grid grid-cols-1 lg:grid-cols-3 p-3 gap-10 md:grid-cols-2 '>
          {posts.map((post)=><Cards post={post} key={post._id}  />)} 
    </div>
    {posts.length===0 && <h1 className='text-3xl text-center font-semibold'>No Posts Yet.....</h1>}
    </div>
  )
}
