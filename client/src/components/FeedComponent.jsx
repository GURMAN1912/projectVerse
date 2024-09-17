import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Cards from './Cards';

export default function FeedComponent() {
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
                setPosts(data);
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
        <div className="h-screen flex flex-col">
            <h1 className="text-2xl font-bold mb-4">Feed Component</h1>

            <div
                className="flex max-h-screen overflow-y-auto space-x-4 py-4"
                style={{ whiteSpace: 'wrap' }} // Ensures items are laid out horizontally
            >
                {loading && <h1>Loading...</h1>}
                {!loading && posts.length === 0 && <h2>No posts available</h2>}
                {posts.map(post => (
                    <div key={post._id} className=""> {/* Inline block for horizontal alignment */}
                        <Cards post={post} />
                    </div>
                ))}
            </div>
        </div>
    );
}
