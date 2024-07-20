import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {FaHamburger, FaList, FaMoon, FaSearch, FaWindowClose} from "react-icons/fa"
export default function Header() {
    const[isOpen,setIsOpen]=useState(false);
  return (
      <>
    <header  className='bg-gray-200 w-full p-4 shadow-2xl'>
        <div className=' flex  justify-between mx-auto  text-xl items-center'>
            <Link to={"/"}>
                <h1 className='font-bold text-sm sm:text-2xl flex flex-wrap'>
                    <span className='text-cyan-400'>
                    Gurman's
                    </span>
                    <span className='text-cyan-300'>
                        blog
                    </span>
                </h1>
            </Link>
        <form  className='text-xl hidden  bg-gray-50 p-1 gap-2 rounded-2xl lg:flex items-center '>
            <input type='text' className='bg-transparent focus:outline-none' placeholder='search..'  />
            <button>
                <FaSearch />
            </button>
        </form>
        <button className='w-12 h=12 p-2 lg:hidden rounded-2xl ' >
            <FaSearch/>
        </button>
        <ul className='flex gap-6 items-center'>
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
        <div className='flex items-center gap-4 md:order-2'>
            <button className='w-12 h-10 outline-double p-2 sm:hidden md:inline rounded-3xl'>
                <FaMoon/>
            </button>
            <Link to={"/sign-up"}>
                <button className='text-sm sm:text-xl  sm: bg-cyan-300 px-3 py-2 rounded-xl font-semibold' >
                    Sign up
                </button>
            </Link>
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
