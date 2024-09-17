import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const reactlogo = "https://firebasestorage.googleapis.com/v0/b/mern-blog-c5a1f.appspot.com/o/1726575526056react.png?alt=media&token=daf37dad-b9a9-438c-a62b-6230fc74c65b";
const tailwind = "https://firebasestorage.googleapis.com/v0/b/mern-blog-c5a1f.appspot.com/o/1726575526057tailwind.png?alt=media&token=ad9ad440-2847-44a7-910d-09be842b7845";
const flutter = "https://firebasestorage.googleapis.com/v0/b/mern-blog-c5a1f.appspot.com/o/1726575526052flutter.png?alt=media&token=94770a9c-8c36-4040-b8c5-61884403ba80";
const javascript = "https://firebasestorage.googleapis.com/v0/b/mern-blog-c5a1f.appspot.com/o/1726575526054javascript.png?alt=media&token=2ea410b1-017c-401f-bf68-d97e51ad8f83";
const bg = "https://firebasestorage.googleapis.com/v0/b/mern-blog-c5a1f.appspot.com/o/1726578004543searchProjects.png?alt=media&token=7ae5bba8-e961-4ed8-9727-cb88a4197c76";

export default function SearchProjects() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlPrams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlPrams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center  bg-gradient-to-tr from-background via-gray-900 to-black p-4 md:p-12">
      <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg w-full md:max-w-md lg:max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Explore Projects by Technology</h1>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="flex items-center mb-6">
          <input 
            type="text" 
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-primary" 
            placeholder="Search Projects..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="bg-secondary text-white p-3 rounded-lg ml-3 hover:bg-opacity-90 transition-all">
            Search
          </button>
        </form>

        {/* Tech Icons */}
        <div className='grid grid-cols-4 gap-4'>
          <img 
            onClick={() => navigate("/search?searchTerm=react")} 
            src={reactlogo} 
            alt="React" 
            className="w-16 h-16 hover:cursor-pointer hover:scale-105 transition-transform duration-200"
          />
          <img 
            onClick={() => navigate("/search?searchTerm=javascript")} 
            src={javascript} 
            alt="JavaScript" 
            className="w-16 h-16 hover:cursor-pointer hover:scale-105 transition-transform duration-200"
          />
          <img 
            onClick={() => navigate("/search?searchTerm=tailwind")} 
            src={tailwind} 
            alt="Tailwind CSS" 
            className="w-16 h-16 hover:cursor-pointer hover:scale-105 transition-transform duration-200"
          />
          <img 
            onClick={() => navigate("/search?searchTerm=flutter")} 
            src={flutter} 
            alt="Flutter" 
            className="w-16 h-16 hover:cursor-pointer hover:scale-105 transition-transform duration-200"
          />
        </div>
      </div>

      {/* Background Image */}
      <img 
        src={bg} 
        alt="Search" 
        className="w-full hidden md:block md:w-1/2 lg:w-2/5 mt-8 md:mt-0 object-contain max-h-[500px] rounded-lg shadow-lg"
      />
    </div>
  );
}
