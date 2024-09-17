import React from "react";
import { FaFacebook, FaGooglePlus, FaInstagram, FaLinkedin, FaLocationArrow, FaPhone, FaTwitter, FaYoutube } from "react-icons/fa";
import logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Footer() {
  const {currentUser} = useSelector(state => state.user)
  return (
    <div className=" text-xl  bg-background text-text   flex flex-col justify-around  px-20 py-10 ">
      <div className=" p-2 border border-t-primary border-t-2 border-b-0  border-l-0  border-r-0 flex md:flex-row flex-col gap-4 justify-around items-center" >
        <div  className="">
          <img src={logo} className="mx-auto cursor-pointer" />
          <p className="text-text gradienttext text-2xl cursor-pointer">ProjectVerse</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <p className="flex items-center  cursor-pointer"><span><FaLocationArrow/></span>Address</p>
          <p className="flex items-center cursor-pointer"><span><FaPhone/></span>Phone</p>
          <div className="flex items-center  flex-row  gap-2 ">
          <p className="flex items-center  gap-2 md:gap-4 md:text-lg text-sm ">SocialMedias: 
            <span  className="cursor-pointer"><FaFacebook/></span>
            <span className="cursor-pointer"><FaTwitter/></span>
            <span className="cursor-pointer"><FaLinkedin/></span>
            <span className="cursor-pointer"><FaYoutube/></span>
            <span className="cursor-pointer"><FaInstagram/></span>
            <span className="cursor-pointer"><FaGooglePlus/></span>
          </p>
          </div>
        </div>
      </div>
      <hr className="opacity-30" />
      <div className="flex lg:flex-row flex-col py-4 justify-between ">
        <h1>Quick Links:</h1>
        <div className="flex  gap-2 md:gap-5 md:text-lg text-sm  ">
          <Link to="/" className="cursor-pointer  hover:underline">Home</Link>
          <Link to="/about" className="cursor-pointer  hover:underline" >About</Link>
          <Link to="/search" className="cursor-pointer  hover:underline">Projects</Link>
          <Link to={currentUser?`/profile`: `/sign-up`} className="cursor-pointer  hover:underline">SignUp</Link>
        </div>
      </div>
    </div>
  );
}
