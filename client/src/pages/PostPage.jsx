import React, { useEffect, useState } from "react";
import SlideShow from "../components/SlideShow";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
import TechStack from "../components/TechStack";
import CommentSection from "../components/CommentSection";
import {
  FaGithub,
  FaLink,
  FaStar,
  FaUserFriends,
  FaUserMinus,
  FaUserPlus,
} from "react-icons/fa";
import MorePosts from "../components/MorePosts";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import {
  updateFailure,
  updateStart,
  updateSuccess,
} from "../redux/user/userSlice";

export default function PostPage() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const postId = useLocation().pathname.split("/")[2];

  const [postData, setPostData] = useState({});
  const [morePosts, setMorePosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(postData.likes);
  const [followed, setFollowed] = useState(currentUser?.followings);

  // Function to like a post
  const handleLikePost = async () => {
    try {
      const res = await fetch(`/api/posts/edit-post/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: [...liked, currentUser._id] }),
      });

      if (!res.ok) {
        toast.error("Failed to like the post.");
        return;
      }
      const data = await res.json();
      setPostData(data);
      toast.success("Post liked successfully");
      setLiked([...liked, currentUser._id]);
    } catch (error) {
      toast.error("Error liking the post.");
      console.error(error);
    }
  };

  // Function to unlike a post
  const handleNotLikePost = async () => {
    try {
      const res = await fetch(`/api/posts/edit-post/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          likes: liked.filter((id) => id !== currentUser._id),
        }),
      });

      if (!res.ok) {
        toast.error("Failed to unlike the post.");
        return;
      }
      const data = await res.json();
      setPostData(data);
      toast.success("Post unliked successfully");
      setLiked(liked.filter((id) => id !== currentUser._id));
    } catch (error) {
      toast.error("Error unliking the post.");
      console.error(error);
    }
  };

  // Function to follow a user
  const handleFollow = async () => {
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/${currentUser._id}/follow`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentUserId: currentUser._id,
          userId: postData.userId,
        }),
      });

      if (!res.ok) {
        toast.error("Failed to follow the user.");
        return;
      }
      const data = await res.json();
      setFollowed([...followed, postData.userId]);
      dispatch(updateSuccess(data.currentUser));
      toast.success("User followed successfully");
    } catch (error) {
      toast.error("Error following the user.");
      dispatch(updateFailure());
      console.error(error);
    }
  };

  // Function to unfollow a user
  const handleUnfollow = async () => {
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/${currentUser._id}/unfollow`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentUserId: currentUser._id,
          userId: postData.userId,
        }),
      });

      if (!res.ok) {
        toast.error("Failed to unfollow the user.");
        return;
      }
      const data = await res.json();
      setFollowed(followed.filter((id) => id !== postData.userId));
      dispatch(updateSuccess(data.currentUser));
      toast.success("User unfollowed successfully");
    } catch (error) {
      toast.error("Error unfollowing the user.");
      dispatch(updateFailure());
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/posts/get-post/${postId}`, {
          method: "GET",
        });

        const data = await res.json();
        if (res.ok) {
          setPostData(data.post);
          setLiked(data.post.likes);
        }

        if (data.post?.userId) {
          const morePostsRes = await fetch(
            `/api/posts/getposts/?userId=${data.post.userId}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
          const morePostsData = await morePostsRes.json();
          setMorePosts(
            morePostsData.posts.filter((post) => post._id !== postId)
          );
        }
      } catch (err) {
        console.error("Error fetching data:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [postId]);
  console.log(postData);
  console.log(morePosts);
  return (
    <div className="bg-background text-text">
      <SlideShow images={postData?.images} loading={loading} />
      <div className="flex text-text justify-center mt-10 rounded-xl p-5 max-w-4xl mx-auto bg-gradient-to-tr from-background via-gray-900 to-black">
        <div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
    {/* Post Title and Category */}
    <div className="text-left">
      <h1 className="text-4xl font-extrabold text-white">Title: {postData?.title}</h1>
      <h2 className="text-2xl text-gray-400 mt-2">Category: {postData?.category}</h2>
      
      {/* Author and Follow/Unfollow Button */}
      <div className="flex items-center gap-8 mt-4">
        <p className="text-lg font-semibold text-white">Author: {postData?.author}</p>
        
        {/* Follow/Unfollow Button */}
        {currentUser && postData.userId !== currentUser._id && (
          <button
            className={`px-6 py-2 rounded-full text-lg flex items-center justify-center transition-all
              ${
                currentUser.followings.includes(postData.userId)
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            onClick={
              currentUser.followings.includes(postData.userId)
                ? handleUnfollow
                : handleFollow
            }
          >
            {currentUser.followings.includes(postData.userId) ? (
              <>
                <FaUserMinus className="mr-2 text-[24px]" />
                Unfollow
              </>
            ) : (
              <>
                <FaUserPlus className="mr-2 text-[24px]" />
                Follow
              </>
            )}
          </button>
        )}
      </div>
    </div>

    {/* Like and Project Links Section */}
    <div className="flex flex-col items-center space-y-6">
      {/* Like Section */}
      <div className="flex items-center bg-gray-900 p-4 rounded-full shadow-lg">
        {postData?.likes?.includes(currentUser?._id) ? (
          <FaStar
            className="text-yellow-500 text-[32px] hover:cursor-pointer"
            onClick={handleNotLikePost}
          />
        ) : (
          <FaStar
            className="text-gray-400 text-[32px] hover:cursor-pointer hover:text-yellow-500"
            onClick={handleLikePost}
          />
        )}
        <p className="ml-3 text-white text-xl">{postData?.likes?.length}</p>
      </div>

      {/* GitHub and Live Links Section */}
      <div className="flex gap-4">
        {postData?.githublink ? (
          <a
            href={postData.githublink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-900 p-3 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-all"
          >
            <FaGithub className="text-[32px]" />
          </a>
        ) : (
          <p className="text-gray-500"></p>
        )}

        {postData?.liveLink ? (
          <a
            href={postData.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-900 p-3 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-all"
          >
            <FaLink className="text-[32px]" />
          </a>
        ) : (
          <p className="text-gray-500"></p>
        )}
      </div>
    </div>
  </div>
</div>


          {loading ? (
            <h1>Loading...</h1>
          ) : (
            <TechStack skills={postData?.skills} />
          )}

          <h1 className="text-2xl py-3 font-semibold">Description:</h1>
          <div
            className="flex flex-col w-full gap-4 items-start justify-items-center"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(postData.content),
            }}
          />
          <hr className="py-2" />

          {loading ? (
            <h1>Loading...</h1>
          ) : (
            currentUser && (
              <CommentSection
                postId={postId}
                comments={postData?.comments}
                author={postData?.author}
              />
            )
          )}
        </div>
      </div>

      <MorePosts posts={morePosts} author={postData?.author} userId={postData?.userId} />
    </div>
  );
}
