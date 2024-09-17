import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Cards from '../components/Cards';
import PostCard from '../components/PostCard';
import { Link } from 'react-router-dom';

export default function FeedSection() {
    const { currentUser } = useSelector(state => state.user);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/posts/timeline', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                const data = await res.json();
                setPosts(data.slice(0, 10));
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };
        fetchPosts();
    }, [currentUser?._id]);

    console.log(posts);

    return (
        <div className="bg-gray-800 flex flex-col text-text">
            <h1 className="text-2xl font-bold my-4 p-4 text-text">Feed Page</h1>

            <div
                className="flex flex-col p-4"
                
            >
                {loading && <h1>Loading...</h1>}
                {!loading && posts.length === 0 && (<div>
                    <h2>No posts available</h2>
            <Link to='/search' >
                <button className="gradient-bg w-full text-white mx-auto px-4 py-2 rounded-md mt-4">
                    Find More People
                    </button>
                    </Link>
                    </div>
                )}

                {posts.map(post => (
                    <div key={post._id} className="p-2"> {/* Inline block for horizontal alignment */}
                        <PostCard post={post} />
                    </div>
                ))}
                <Link to='/search' >
                <button className="gradient-bg w-full text-white mx-auto px-4 py-2 rounded-md mt-4">
                    Find More People
                    </button>
                    </Link>
            </div>
        </div>
    );
  
}
