import DOMPurify from 'dompurify';
import React from 'react';
import { FaComment, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  const sanitizedContent = DOMPurify.sanitize(post.content);  // Sanitize the whole content
  const preview = sanitizedContent.slice(0, 200);  // Get preview of the first 100 characters
  console.log(preview);
  console.log(post);

  return (
    <div className="bg-gray-900 text-text rounded-lg shadow-md p-4 mb-4">
      {/* Post Title and Stats */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">{post.title}</h3>
        <div className="flex items-center gap-2">
          <FaStar className="text-yellow-500" />
          <p className="">{post.likes.length}</p>
          <FaComment className="text-text" />
          <p className="text-gray-500">{post.comments.length}</p>
        </div>
      </div>

      {/* Post Preview */}
      <div
        className="mt-4 text-text bg-gray-900"
        dangerouslySetInnerHTML={{ __html: preview }}  // Render preview content
      />

      {/* Post Image */}
      {post.images && (
        <img
          src={post.images[0]}
          alt={post.title}
          className="w-full h-48 object-contain rounded-lg mt-4"
        />
      )}

      {/* Author Info and Read More Button */}
      <div className="flex justify-between items-center mt-4">
        <Link to={`/profile/${post.userId}`} className="flex items-center gap-2">
          {post.authorProfilePicture && (
            <img
              src={post.authorProfilePicture}
              alt={post.author}
              className="w-8 h-8 rounded-full"
            />
          )}
          <p className="text-text">{post.author}</p>
          <p className="text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
        </Link>
        <Link  to={`/post/${post._id}`} className="gradient-bg text-white px-4 py-2 rounded-md">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostCard;