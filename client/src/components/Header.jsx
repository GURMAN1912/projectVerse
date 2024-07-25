import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {FaHamburger, FaList, FaMoon, FaSearch, FaWindowClose} from "react-icons/fa"
import {useDispatch, useSelector} from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
export default function Header() {
    const[isOpen,setIsOpen]=useState(false);
    const  {currentUser}=useSelector(state=>state.user);
    const dispatch=useDispatch();
    console.log({currentUser})
  return (
      <>
    <header  className=' w-full p-4 shadow-2xl'>
        <div className=' flex  justify-between mx-auto  text-xl items-center'>
            <Link to={"/"}>
                <h1 className='font-bold text-lg md:text-2xl sm:text-3xl flex flex-wrap'>
                    <span className='text-pink-500'>
                    Gurman's
                    </span>
                    <span className='text-pink-400'>
                        blog
                    </span>
                </h1>
            </Link>
        <form  className='text-xl hidden p-1 gap-2 rounded-2xl lg:flex items-center '>
            <input type='text' className='focus:outline-none' placeholder='search..'  />
            <button>
                <FaSearch />
            </button>
        </form>
        <button className='w-12 h=12 p-2 lg:hidden rounded-2xl ' >
            <FaSearch/>
        </button>
        <ul className= 'text-lg flex gap-6 items-center'>
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
          <button onClick={()=>dispatch(toggleTheme())} className='p-2 outline rounded-2xl'>
            <FaMoon/>
          </button>
      {currentUser ? (
        <div className="w-10 h-10 ">
          <img
            src={currentUser.profilePicture}
            alt="User Profile"
            className="cursor-pointer rounded-full"
          />
        </div>
      ) : (
        <Link to="/sign-up">
          <button className="text-sm text-white md:text-lg sm:text-xl bg-pink-600 px-3 py-2 rounded-xl ">
            Sign up
          </button>
        </Link>
      )}
    </div>

        <div>
            <button className='px-3 sm:hidden' onClick={()=>setIsOpen(!isOpen)}>
                {isOpen?(
                    <FaWindowClose/>
                ):(
                    <FaList />                
                )}
            </button>
           
        </div>
        </div>
    </header>
     {isOpen &&(
        <ul className='block px-4 bg-gray-200 '>
        <Link to={"/"}>
        <li className=' block hover:underline  '>Home</li>
        </Link>
        <Link to={"/about"}>
        <li  className=' hover:underline  ' >About</li>
        </Link>
        <Link to={"/projects"}>
          <li className=' hover:underline '>Projects</li>
        </Link>
    </ul>
    )}
    </>
  )
}
