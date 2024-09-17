import React from 'react'
import { useSelector } from 'react-redux';

export default function HeroBanner() {
    const {currentUser} = useSelector(state => state.user);
const earthImageUrl = "https://firebasestorage.googleapis.com/v0/b/mern-blog-c5a1f.appspot.com/o/1726474094803earth.png?alt=media&token=ab5f2caa-116c-4cbb-a9e8-bcbab084c0b7"

  return (
    <div className=" bg-background flex items-center justify-center text-white">
    <div className="flex flex-col items-center justify-around md:flex-row">
        {currentUser ? (
            <div className="text-center sm:ml-10 mx-2  flex-2  ">
            <h1 className="text-5xl font-bold mb-4 gradienttext">Welcome {currentUser.username}</h1>
            <p className="text-xl mb-6">Join our vibrant and supportive community where creators, innovators, and enthusiasts come together to share knowledge on exciting projects, and inspire each other. Be a part of a collective that values creativity. Together, we make ideas come to life!</p>   
            <button className="gradient-bg text-text px-4 py-2 font-semibold rounded-md">Create a Post</button>
          </div>

        ):(
      <div className="text-center sm:ml-10 mx-2  flex-2  ">
        <h1 className="text-5xl font-bold mb-4 gradienttext">Inspiration is Everywhere</h1>
        <p className="text-lg mb-6">There is no passion to be found playing small in settling for a life that is less than the one you are capable of living.</p>   

        <button className="gradient-bg text-white px-4 py-2 rounded-md">Get Started</button>
      </div>

        )}
      
      <img src={earthImageUrl} alt="Globe" className="w-4/5 object-contain p-2 mx-auto h-auto md:w-2/3 " />
      
    </div>
  </div>
  )
}
