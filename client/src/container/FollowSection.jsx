import React from 'react'
import FriendCard from '../components/FriendCard'
import { Link } from 'react-router-dom'

export default function FollowSection({followings}) {
  console.log(followings)
  const slicedFollowings = followings.slice(0, 4)
  return (
    <div className="bg-gray-900 max-w-xs text-white p-4 rounded-lg">
      <h2 className="text-lg font-semibold">You are following {followings.length} peoples</h2>
      <div className="">
        {slicedFollowings?.map((friendId) => (
          <FriendCard key={friendId} friendId={friendId} />
        ))}

      </div>
      {followings.length > -1 && (
        <Link to='/user/following' >
        <button  className="gradient-bg w-full text-white mx-auto px-4 py-2 rounded-md mt-4">
          View More
        </button>
        </Link>
      )}

    </div>
  )
}
