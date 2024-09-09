import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {FaHamburger, FaList, FaMoon, FaSearch, FaSun, FaWindowClose} from "react-icons/fa"
import {useDispatch, useSelector} from 'react-redux';
export default function Header() {
    const[isOpen,setIsOpen]=useState(false);
    const  {currentUser}=useSelector(state=>state.user);
    const dispatch=useDispatch();
    console.log({currentUser})
  return (
      <>
    <header  className=' w-full p-4 shadow-xl bg-primary  border-b-background'>
        <div className=' flex  justify-between mx-auto  text-xl items-center'>
            <Link to={"/"}>
                <h1 className='font-bold text-lg md:text-2xl sm:text-3xl flex flex-wrap'>
                    <span className='text-text'>
                        Project
                    </span>
                    <span className='text-text'>
                        Verse
                    </span>
                </h1>
            </Link>
        <form  className='text-xl hidden p-1 gap-2 rounded-2xl lg:flex items-center bg-inputbg '>
            <input type='text' className='border outline-none w-full  bg-inputbg' placeholder='search..'  />
            <button>
                <FaSearch  className='text-text m-2'/>
            </button>
        </form>
        <button className='w-12 h=12 p-2 lg:hidden rounded-2xl ' >
            <FaSearch  className='text-text ' />
        </button>
        <ul className= 'text-lg text-text flex gap-6 items-center'>
            <Link to={"/"}>
            <li className='hidden sm:inline hover:underline  '>Home</li>
            </Link>
            <Link to={"/about"}>
            <li  className='hidden sm:inline hover:underline ' >About</li>
            </Link>
            <Link to={"/projects"}>
              <li className='hidden sm:inline hover:underline '>Projects</li>
            </Link>
        </ul>
        <div className=" flex gap-3 items-center">
      {currentUser ? (
        <Link to={"/dashboard/?tab=profile"}>
        <div className="w-12 h-12  rounded-full ">
          <img
            src={currentUser.profilePicture}
            alt="User Profile"
            className="cursor-pointer object-cover w-full h-full rounded-full"
            />
        </div>
            </Link>
      ) : (
        <Link to="/sign-up">
          <button className="text-sm text-white md:text-lg sm:text-xl bg-secondary px-3 py-2 rounded-xl ">
            Sign up
          </button>
        </Link>
      )}
    </div>

        <div>
            <button className='px-3 sm:hidden' onClick={()=>setIsOpen(!isOpen)}>
                {isOpen?(
                    <FaWindowClose className='text-text'/>
                ):(
                    <FaList  className=' text-text'/>                
                )}
            </button>
           
        </div>
        </div>
    </header>
     {isOpen &&(
        <ul className='block shadow-2xl px-4 bg-primary text-text'>
        <Link to={"/"}>
        <li className=' block hover:underline hover:cursor-pointer'>Home</li>
        </Link>
        <Link to={"/about"}>
        <li  className=' hover:underline  hover:cursor-pointer' >About</li>
        </Link>
        <Link to={"/projects"}>
          <li className=' hover:underline  hover:cursor-pointer'>Projects</li>
        </Link>
    </ul>
    )}
    </>
  )
}
