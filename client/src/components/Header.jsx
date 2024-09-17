import React, { useEffect, useState } from 'react'
import { Link ,useLocation, useNavigate} from 'react-router-dom'
import {FaHamburger, FaList, FaMoon, FaSearch, FaSun, FaWindowClose} from "react-icons/fa"
import {useDispatch, useSelector} from 'react-redux';
export default function Header() {
    const[isOpen,setIsOpen]=useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const  {currentUser}=useSelector(state=>state.user);
    const dispatch=useDispatch();
    const location=useLocation();
    const navigate=useNavigate();
    const handleSubmit=(e)=>{
      e.preventDefault();
      const urlParams = new URLSearchParams(location.search);
      urlParams.set("searchTerm",searchTerm);
      const searchQuery=urlParams.toString();
      navigate(`/search?${searchQuery}`);
    }

    console.log(currentUser)
    useEffect(() => {
      const urlPrams = new URLSearchParams(location.search);
      const searchTermFromUrl = urlPrams.get("searchTerm");
      if(searchTermFromUrl){
        setSearchTerm(searchTermFromUrl);
    }
  }
    , [location.search]);
  return (
      <>
    <header  className=' w-full p-4 shadow-xl bg-background border-b-'>
        <div className=' flex  justify-around  text-xl items-center'>
            <Link to={"/"}>
            <h1 className='font-bold text-lg md:text-2xl sm:text-3xl flex flex-wrap gradienttext'>
                    ProjectVerse
                </h1>
            </Link>
        <form onSubmit={handleSubmit} className='text-xl hidden p-1 gap-2 rounded-2xl lg:flex items-center bg-inputbg '>
            <input type='text' onChange={(e)=>setSearchTerm(e.target.value)} className='border outline-none w-full  bg-inputbg' placeholder='search..'  />
            <button type='submit'>
                <FaSearch  className='text-text m-2'/>
            </button>
        </form>
        <button onClick={()=>navigate("/search")} className='w-12 h=12 p-2 lg:hidden rounded-2xl ' >
            <FaSearch  className='text-text ' />
        </button>
        <ul className= 'text-lg text-text  gap-6 items-center hidden md::flex'>
            <Link to={"/"}>
            <li className='hidden sm:inline hover:underline  '>Home</li>
            </Link>
            <Link to={"/about"}>
            <li  className='hidden sm:inline hover:underline ' >About</li>
            </Link>
            <Link to={"/search"}>
              <li className='hidden sm:inline hover:underline '>Posts</li>
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
        <div className='flex gap-2'>
        <Link to="/sign-up">
          <button className="text-sm text-white md:text-lg sm:text-xl bg-secondary px-3 py-2 rounded-xl ">
            Sign up
          </button>
        </Link>
        <Link to="/sign-in">
          <button className="text-sm text-white md:text-lg sm:text-xl bg-primary px-3 py-2 rounded-xl ">
            Login
          </button>
        </Link>

        </div>
      )}
    </div>

        
        </div>
    </header>
     {isOpen &&(
        <ul className='block shadow-2xl  px-4 bg-background text-text'>
        <Link to={"/"}>
        <li className=' block hover:underline hover:cursor-pointer'>Home</li>
        <hr className='opacity-20' />
        </Link>
        <Link to={"/about"}>
        <li  className=' hover:underline  hover:cursor-pointer' >About</li>
        <hr className='opacity-20' />
        </Link>
        <Link to={"/search"}>
          <li className=' hover:underline  hover:cursor-pointer'>Posts</li>
          <hr className='opacity-20' />
        </Link>
    </ul>
    )}
    </>
  )
}
