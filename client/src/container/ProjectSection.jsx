import React, { useEffect, useState } from 'react';
import Cards from '../components/Cards';
import { Link } from 'react-router-dom';

export default function ProjectSection({ userId }) {
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!userId) {
        return;
      }
      try {
        const res = await fetch(`/api/posts/getposts/?userId=${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!res.ok) {
          throw new Error('Something went wrong');
        }
        const response = await res.json();
        setPostData(response.posts);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [userId]);

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }
  console.log(postData);

  return (
    <div className="py-10 px-5  flex flex-col  justify-center items-center bg-background text-text">
      <h1 className="text-5xl font-bold mb-6">Projects</h1> 
      <hr className="border-gray-600 mb-4" />
        <div className="grid md:gap-6 lg:gap-12 md:grid-cols-1 lg:grid-cols-2">
            {postData.length === 0 && <div className="text-lg">No projects found</div>}
            </div>
      <div className="grid md:gap-6 lg:gap-12 md:grid-cols-1 lg:grid-cols-2">
        {postData.slice(0,4).map((post) => (
            <Cards key={post._id} post={post} />
        ))
            }
      </div>
      <Link to={`/profile/${userId}/projects`} className="text-lg text-secondary mt-4">View all projects</Link>
    </div>
  );
}
