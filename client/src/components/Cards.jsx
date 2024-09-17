import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for alerts
import { useSelector } from 'react-redux';

export default function Cards({ post }) {
  const params = useLocation().pathname.split("/")[1];
  const {currentUser} = useSelector(state => state.user);
  const navigate = useNavigate();
  const [popup, setPopup] = React.useState(false);

  const postPage = () => {
    navigate(`/post/${post._id}`);
  };

  const editPost = () => {
    navigate(`/edit-post/${post._id}`);
  };

  const deletePost = async () => {
    try {
      const res = await fetch(`/api/posts/delete-post/${post._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message); // Display success message
        setPopup(false); // Close popup after deletion
      } else {
        toast.error(data.message); // Display error message
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="card bg-gradient-to-b from-gray-700 to-gray-800 rounded-lg shadow-lg text-text transition-transform duration-300 h-[400px] w-[300px] flex flex-col justify-between"
    >
      <img
        src={
          post.images[0] ||
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
        }
        alt="post"
        className="h-40 w-full object-cover rounded-t-lg"
      />

      <div className="card-content p-4 flex-grow">
        {/* Post Title */}
        <h1
          className="card-title text-lg font-semibold text-white hover:cursor-pointer hover:text-blue-400 transition-colors duration-200"
          onClick={postPage}
        >
          {post.title.length > 20 ? `${post.title.substring(0, 20)}...` : post.title}
        </h1>
        <p className="text-sm text-gray-400">{post.category}</p>

        {/* Author Info */}
        <div className="author-info flex items-center mt-4">
          <img
            src={post.authorProfilePicture}
            alt={`${post.author}'s profile`}
            className="author-image rounded-full w-12 h-12 object-cover"
          />
          <div className="author-details ml-3">
            <Link to={ `/profile/${post.userId}`} className="author-name text-white font-medium hover:underline">
              {post.author}
            </Link>
            <p className="text-gray-500 text-sm">{new Date(post.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons (Edit/Delete) */}
      {params === "dashboard" && (
        <div className="flex justify-around py-4 px-6 border-t border-gray-600">
          <button
            onClick={editPost}
            className="bg-blue-500 px-4 py-2 rounded-md text-white font-semibold hover:bg-blue-600 transition-colors duration-200"
          >
            Edit
          </button>
          <button
            className="bg-red-500 px-4 py-2 rounded-md text-white font-semibold hover:bg-red-600 transition-colors duration-200"
            onClick={() => setPopup(true)}
          >
            Delete
          </button>
        </div>
      )}

      {/* Popup for Delete Confirmation */}
      {popup && (
        <Popup
          open={popup}
          className="bg-gray-800"
          closeOnDocumentClick
          onClose={() => setPopup(false)}
        >
          <div className="p-6 bg-gray-800 text-white rounded-lg shadow-md">
            <h1 className="text-center text-2xl font-semibold mb-4">
              Are you sure you want to delete the post - {post.title}?
            </h1>
            <p className="text-center mb-6">This action cannot be undone.</p>
            <div className="flex justify-evenly">
              <button
                className="bg-gray-600 px-6 py-2 rounded-md text-white hover:bg-gray-500 transition-colors duration-200"
                onClick={() => setPopup(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 px-6 py-2 rounded-md text-white hover:bg-red-500 transition-colors duration-200"
                onClick={deletePost}
              >
                Delete
              </button>
            </div>
          </div>
        </Popup>
      )}
    </motion.div>
  );
}
