import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook,FaInstagram,FaGithub, FaCopyright, FaTwitter } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="border border-black border-t-8 ">
      <div className="w-full max-w-7xl mx-auto">
        <div className="gird w-full justify-between sm:flex md:grid-col-1">
          <div className="mt-5">
            <Link to={"/"}>
              <h1 className="font-bold text-3xl flex flex-wrap">
                <span className="text-cyan-400">Gurman's</span>
                <span className="text-cyan-300">blog</span>
              </h1>
            </Link>
          </div>
        <div className=" m-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-8">
          <div>
            <h3 className="text-xl">ABOUT</h3>
            <div className="flex flex-col">
              <Link to={"https://github.com/GURMAN1912"} target="blank">
                Github
              </Link>
              <Link to={"/about"}>Gurman Blog</Link>
            </div>
            </div>
            <div>
              <h3 className="text-xl">FOLLOW US</h3>
              <div className="flex flex-col">
                <Link to={"https://github.com/GURMAN1912"} target="blank">
                  Github
                </Link>
                <Link
                  to={"https://linkedin.com/in/gurman-singh-sambhi-9794aa234/"}
                >
                  Linkdin
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-xl">LEGAL</h3>
              <div>
                <p>Privacy Policy</p>
                <p>Term & Conditions</p>
              </div>
            </div>
        </div>
        </div>
        <hr />
        <div className="flex items-center justify-between">
            <span className="flex items-center">
                <FaCopyright size={"25px"}/> by Gurman Blog {new Date().getFullYear()} 
            </span>
            <div className="text-3xl flex gap-8">
            <FaFacebook/>
            <FaGithub/>
            <FaInstagram/>
            <FaTwitter/>
            </div>
        </div>  

      </div>
    </footer>
  );
}
