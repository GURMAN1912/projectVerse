import React from 'react';
import { FaUser, FaBriefcase, FaGraduationCap, FaCog } from 'react-icons/fa';
import image from '../assets/homebg.png';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
export default function ProfileCard() {
    const {currentUser} = useSelector(state => state.user);
    return (
        <div className="max-w-sm  max-h-[100vh] bg-gray-900 rounded-lg shadow-lg overflow-hidden border-2 border-gray-800">
            {/* Background Image and Profile Picture */}
            <div className="relative">
                <img 
                    src={image} 
                    alt="Background" 
                    className="w-full h-24 object-cover"
                />
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
                    <img
                        src={currentUser.profilePicture} 
                        alt="Profile"
                        className="w-20 h-20 object-cover rounded-full border-4 border-gray-900"
                    />
                </div>
            </div>

            {/* User Information */}
            <div className="text-center mt-12  text-text">
                <Link to={`profile/${currentUser._id}`} className="text-lg font-semibold">
                    {currentUser.username}
                </Link>
                <p className="text-sm ">{currentUser.bio}</p>
            </div>

            {/* Menu Section */}
            <div className="mt-5 border-t  border-gray-800 text-text">
                <div className="flex flex-col">
                    <Link to={`/profile/${currentUser._id}`} className="py-3 px-4 flex items-center justify-start hover:bg-background">
                        <FaUser className="mr-3 text-gray-600" />
                        <span className="">Profile</span>
                    </Link>
                    
                    <Link to={"/dashboard?tab=posts"} className="py-3 px-4 flex items-center justify-start hover:bg-background">
                        <FaGraduationCap className="mr-3 text-gray-600" />
                        <span className="">Posts</span>
                    </Link>
                    <Link to={"/dashboard?tab=profile"} className="py-3 px-4 flex items-center justify-start hover:bg-background">
                        <FaCog className="mr-3 text-gray-600" />
                        <span className="">Settings</span>
                    </Link>
                <Link to="/Create-post" className=' gradient-bg my-2 text-center p-2 rounded-full'>
                    
                        <span className="">Create Post</span>
                    
                </Link>
                </div>
            </div>
        </div>
    );
}
