import React from 'react'
import FriendCard from '../components/FriendCard'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function FollowersPage() { const {currentUser} = useSelector(state => state.user)
const followers = currentUser.followers
return (
<div className="bg-gray-900 max-w-3xl mx-auto h-screen text-white p-4 rounded-lg">
  <h2 className="text-lg font-semibold">You are followed by {followers.length} peoples</h2>
  <div className=" gap-4">
    {followers?.map((friendId) => (
      <FriendCard key={friendId} friendId={friendId} />
    ))}

  </div>
  <Link to="/search" >
    <button  className="gradient-bg w-full text-white mx-auto px-4 py-2 rounded-md mt-4">
        Find More People
    </button>
    </Link>

</div>
)
}
