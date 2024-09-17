import React, { useEffect, useState } from 'react'
import { FaUserMinus, FaUserPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateFailure, updateStart, updateSuccess } from '../redux/user/userSlice';
import { toast } from 'react-toastify';

export default function FriendCard({friendId}) {
    const [friend, setFriend] = useState(null);
    const [followed, setFollowed] = useState([]);

    const dispatch = useDispatch();

    const {currentUser} = useSelector(state => state.user);
    useEffect(() => {
        const fetchFriend = async () => {
            try {
                const res = await fetch(`/api/user/get-user/${friendId}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.message);
                }
                setFriend(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchFriend();
    }, [friendId]);
    const handleFollow = async () => {
        try {
          dispatch(updateStart());
          const res = await fetch(`/api/user/${currentUser._id}/follow`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ currentUserId: currentUser._id, userId: friendId }),
          });
    
          if (!res.ok) {
            toast.error('Failed to follow the user.');
            return;
          }
          const data = await res.json();
          setFollowed([...followed, postData.userId]);
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
              userId: friendId,
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
    <div className='  border border-gray-800 border-b-2 '>
        {friend && (
            <div className='bg-gray-900 p-2 rounded-lg flex  justify-between items-center '>
                <Link to={`/profile/${friend._id}`} className='flex gap-2 items-center'>
                
            <img
                src={
                    friend.profilePicture ||
                    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                }
                alt='friend'
                className='h-16 w-16 object-cover rounded-full '
                />
            <h2 to="" className='text-center text-white font-semibold text-sm mt-2'>
                {friend.username.slice(0, 8)}
            </h2>
                </Link>
                <div className='bg-black rounded-full p-3 hover:cursor-pointer'>
                  {currentUser?.followings ? (
                    <FaUserMinus className='text-[20px] text-red-600' onClick={handleUnfollow} />
                  ) : (
                    <FaUserPlus className='text-[20px] text-green-600' onClick={handleFollow} />
                  )}
                </div>
            </div>
        )}
      
    </div>
  )
}
