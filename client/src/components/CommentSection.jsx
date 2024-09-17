import React, { useState } from 'react';
import { FaPaperPlane, FaTrashAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';

export default function CommentSection({ postId,postData, loading }) {
  const {currentUser} = useSelector((state) => state.user);
  const [comments, setComments] = useState({
    username: currentUser?.username,
    content: "",
    profilePicture: currentUser?.profilePicture,
    createdAt: new Date(),
  });
  console.log(currentUser);
  console.log(postData);
  const [error, setError] = useState(null); // State to track errors
  const [postComments, setPostComments] = useState(postData?.comments || []); // Store post comments

  const addComment = async (e) => {
    e.preventDefault();
    setError(null); // Reset error before trying to submit
    
    try {
      const res = await fetch(`/api/posts/add-comment/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({  comments}),
      });

      if (res.ok) {
        const newComment = {
          username: currentUser.username,
          profilePicture: currentUser.profilePicture,
          content: comments.content,
          createdAt: new Date(),
        };

        setPostComments([...postComments, newComment]);
        setComments({ ...comments, content: "" });
      } else {
        setError('Failed to add comment');
      }
    } catch (err) {
      setError('Failed to add comment. Please try again.');
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setComments({ ...comments, content: e.target.value });
  };
  console.log(postComments);

  return (
    <div className='text-text'>
      <h1>Comment Section:</h1>

      <form className='flex gap-3 items-center' onSubmit={addComment}>
        <input
          type='text'
          placeholder='Add a comment'
          className='bg-primary text-text p-2 rounded-lg my-2 w-full'
          value={comments.content} // Bind input value to state
          onChange={handleChange}
        />

        <button
          type='submit'
          className='bg-borderFocus text-background px-2 py-2 rounded-lg my-2'
          disabled={loading || !comments.content} // Disable while loading or when content is empty
        >
          <FaPaperPlane />
        </button>
      </form>

      {error && <p className='text-red-500'>{error}</p>} {/* Display error if any */}

      <div>
        {postComments.length > 0 ? (
          postComments.map((comment, idx) => (
            <div key={idx} className='p-2 border-b border-gray-300 flex justify-between items-center'>
              <div className='flex '>
              <img src={comment?.profilePicture} className='w-10 h-10 rounded-full' />
              <div className='ml-2'>
                <h4 className='text-md'>{comment?.username}</h4>
                <p className='text-sm px-1 '>{comment?.content}</p>
                </div>
              </div>
                {/* <div>
                  <button>
                    <FaTrashAlt className='text-highlight '  />
                  </button>
                </div> */}

            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
}
