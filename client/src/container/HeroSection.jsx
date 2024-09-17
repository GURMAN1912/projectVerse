import React from 'react';
import { FaUserMinus, FaUserPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateFailure, updateStart, updateSuccess } from '../redux/user/userSlice';
import { toast } from 'react-toastify';

export default function HeroSection({ name, bio, prifilePicture, profile }) {
  const {currentUser} = useSelector(state => state.user);
  const following =currentUser? currentUser.followings: [];
  const dispatch = useDispatch();
  const userId=useParams().userId;
  console.log(userId);
  console.log(prifilePicture);
  const handleFollow = async () => {
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/${currentUser._id}/follow`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentUserId: currentUser._id, userId: userId }),
      });

      if (!res.ok) {
        toast.error('Failed to follow the user.');
        return;
      }
      const data = await res.json();
      dispatch(updateSuccess(data.currentUser));
      toast.success('User followed successfully');
    } catch (error) {
      toast.error('Error following the user.');
      dispatch(updateFailure());
      console.error(error);
    }
  };

  // Function to unfollow a user
  const handleUnfollow = async () => {
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/${currentUser._id}/unfollow`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentUserId: currentUser._id,
          userId: userId,
        }),
      });

      if (!res.ok) {
        toast.error('Failed to unfollow the user.');
        return;
      }
      const data = await res.json();
      dispatch(updateSuccess(data.currentUser));
      toast.success('User unfollowed successfully');
    } catch (error) {
      toast.error('Error unfollowing the user.');
      dispatch(updateFailure());
      console.error(error);
    }
  };

  return (
    <div className="h-[90vh] w-full bg-background flex items-center justify-center text-white px-4">
      <div className="flex flex-col md:flex-row text-center md:text-left items-center">
        <div className="w-32 h-32 rounded-full bg-gray-300 mb-4 md:mb-0 md:mr-6">
          <img className="w-32 h-32 rounded-full" src={prifilePicture} alt="profile" />
        </div>
        <div>
          <h1 className="text-2xl md:text-4xl font-bold mb-2">{name}</h1>
          <p className="text-md md:text-lg mb-2">{profile}</p>
          <p className="text-sm md:text-lg mb-6">{bio}</p>
        </div>
        <div>
        { currentUser && userId !== currentUser._id && (
  <button
    className="bg-gray-900 text-white px-4 py-2 rounded-full flex items-center justify-center"
    onClick={following.includes(userId) ? handleUnfollow : handleFollow}
  >
    {currentUser&& following.includes(userId) ? (
      <FaUserMinus className="text-[30px] text-red-600" />
    ) : (
      <FaUserPlus className="text-[30px] text-green-600" />
    )}
  </button>
)}

        </div>
      </div>
    </div>
  );
}
