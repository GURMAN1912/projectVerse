import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {FaHamburger, FaList, FaMoon, FaSearch, FaWindowClose} from "react-icons/fa"
export default function Header() {
    const[isOpen,setIsOpen]=useState(false);
  return (
      <>
    <header  className='bg-indigo-950 w-full p-4 shadow-xl'>
        <div className=' flex  justify-between mx-auto text-yellow-50  text-xl items-center'>
            <Link to={"/"}>
                <h1 className='font-bold text-sm sm:text-2xl flex flex-wrap'>
                    <span className='text-red-200'>
                    Gurman's
                    </span>
                    <span className='text-red-300'>
                        blog
                    </span>
                </h1>
            </Link>
        <form  className='text-xl hidden lg:inline bg-red-400 p-2 text-indigo-950 rounded-2xl '>
            <input type='text' className='  text-indigo-950 bg-transparent focus:outline-none' placeholder='search..'  />
            <button>
                <FaSearch/>
            </button>
        </form>
        <button className='w-12 h=12 p-2 lg:hidden text-indigo-950 rounded-2xl bg-red-400' >
            <FaSearch/>
        </button>
        <ul className='flex gap-6 items-center'>
            <Link to={"/"}>
            <li className='hidden sm:inline hover:underline text-red-300 '>Home</li>
            </Link>
            <Link to={"/about"}>
            <li  className='hidden sm:inline hover:underline text-red-300 ' >About</li>
            </Link>
            <Link to={"/projects"}>
              <li className='hidden sm:inline hover:underline text-red-300'>Projects</li>
            </Link>
        </ul>
        <div className='flex items-center gap-4 md:order-2'>
            <button className='w-12 h-12 bg-red-400 p-2 sm:hidden md:inline text-indigo-950 rounded-3xl'>
                <FaMoon/>
            </button>
            <Link to={"/sign-in"}>
                <button className='sm: bg-red-400 p-2 rounded-md text-indigo-950 font-semibold' >
                    Sign In
                </button>
            </Link>
        </div>

        <div>
            <button className='px-3 sm:hidden text-red-400' onClick={()=>setIsOpen(!isOpen)}>
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
        <ul className='block bg-indigo-900 px-4 '>
        <Link to={"/"}>
        <li className=' block hover:underline text-red-300 '>Home</li>
        </Link>
        <Link to={"/about"}>
        <li  className=' hover:underline text-red-300 ' >About</li>
        </Link>
        <Link to={"/projects"}>
          <li className=' hover:underline text-red-300'>Projects</li>
        </Link>
    </ul>
    )}
    </>
  )
}
