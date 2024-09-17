import React, { useEffect, useState, useRef } from 'react';
import Cards from '../../components/Cards';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function ExploreProjects() {
  const [posts, setPosts] = useState([]);
  const [randomPosts, setRandomPosts] = useState([]);
  const exploreSectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await fetch('/api/posts/getposts');
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message);
        }
        setPosts(data);

        if (data.length > 0) {
          const shuffled = data.sort(() => 0.5 - Math.random());
          const selectedPosts = shuffled.slice(0, 3);
          setRandomPosts(selectedPosts);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getPosts();
  }, []);

  return (
    <div
      ref={exploreSectionRef}
      className="min-h-screen flex flex-col justify-center items-center py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-tr from-background via-gray-900 to-black"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-secondary">
          Explore Innovative Projects
        </h2>
        <p className="text-lg sm:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          Discover creative solutions from our global community of developers and makers. Dive into the latest projects, view code, and gain inspiration for your next big idea.
        </p>
        <div className="flex flex-col items-center sm:grid lg:grid  sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {randomPosts.map((post) => (
            <Cards key={post._id} post={post} />
          ))}
        </div>
        <button
          className="mt-12 bg-gradient-to-r from-secondary to-primary hover:from-pink-600 hover:to-blue-600 text-white py-4 px-10 rounded-full text-lg transition-all duration-300 ease-in-out transform hover:scale-105"
          onClick={() => navigate('/search')}
        >
          Explore More Projects
        </button>
      </div>
    </div>
  );
}
