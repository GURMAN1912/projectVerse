import PostCard from '../components/PostCard';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cards from '../components/Cards';
import { FaSpinner } from 'react-icons/fa';

export default function SearchPage() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');

    if (searchTermFromUrl || sortFromUrl ) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl || '',
        sort: sortFromUrl || 'desc',
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      try {
        const res = await fetch(`/api/posts/getposts?${searchQuery}`);
        const data = await res.json();
        if (!res.ok) throw new Error('Failed to fetch posts');
        setPosts(data);
        setShowMore(data.posts.length === 9);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSidebarData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(sidebarData);
    navigate(`/search?${urlParams.toString()}`);
  };

  const handleShowMore = async () => {
    const startIndex = posts.length;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();

    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    const data = await res.json();
    if (res.ok) {
      setPosts([...posts, ...data.posts]);
      setShowMore(data.posts.length === 9);
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-background text-text min-h-screen">
      {/* Sidebar */}
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500 w-full md:w-1/4">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label htmlFor="searchTerm" className="whitespace-nowrap font-semibold">Search Term:</label>
            <input
              className="border outline-none w-full bg-inputbg p-2 rounded-md"
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={handleChange}
              placeholder="Search..."
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="font-semibold">Sort:</label>
            <select
              id="sort"
              onChange={handleChange}
              value={sidebarData.sort}
              className="bg-background text-white p-2 rounded-md"
            >
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </select>
          </div>
          
          <button type="submit" className="gradient-bg my-2 text-center p-2 rounded-full">
            Apply Filters
          </button>
        </form>
      </div>

      {/* Posts */}
      <div className="w-full md:w-3/4">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5">
          Posts Results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && posts.length === 0 && (
            <p className="text-xl text-gray-500">No posts found.</p>
          )}
          {loading && (
            <div className="flex justify-center items-center w-full">
              <FaSpinner className="animate-spin text-xl text-teal-500" />
            </div>
          )}
          {!loading && posts.map((post) => <Cards key={post._id} post={post} />)}
          {showMore && (
            <button
              onClick={handleShowMore}
              className="text-teal-500 text-lg hover:underline p-7 w-full"
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
