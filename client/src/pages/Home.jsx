import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import HeroBanner from '../container/home/HeroBanner';
import ExploreProjects from '../container/home/ExploreProjects';
import SearchProjects from '../container/home/SearchProjects';
import { useSelector } from 'react-redux';
import ProfileSection from '../container/ProfileSection';
import FollowSection from '../container/FollowSection';
import FeedSection from '../container/FeedSection';
import { toast } from 'react-toastify';

;

export default function Home() {
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.user);
  
  return (
    
    <div className=' bg-background min-h-screen'>
      {currentUser ? (
        <div className="flex flex-col lg:flex-row justify-around">
          <div className="  flex justify-center lg:block   lg:w-1/6 mb-6 lg:mb-0">
            <ProfileSection />
          </div>
          <div className="w-full lg:w-2/4 mb-6 lg:mb-0">
            <FeedSection />
          </div>
          <div className="flex justify-center lg:block  lg:w-1/6">
            <FollowSection followings={currentUser.followings} />
          </div>
        </div>
      ) : (
        <div >
          <div >
            <HeroBanner />
          </div>
          <div >
            <ExploreProjects />
          </div>
          <div >
            <SearchProjects />
          </div>
        </div>
      )}
    </div>
  );
}
