import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';

export default function DashBoard() {
  const location = useLocation();
  const [tab, setTab] = useState(() => {
    // Initialize state from URL params when component first loads
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get('tab') || '';
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFormUrl = urlParams.get('tab');
    if (tabFormUrl) {
      setTab(tabFormUrl);
    }
  }, [location.search]);
  
  const profilePage="https://firebasestorage.googleapis.com/v0/b/mern-blog-c5a1f.appspot.com/o/1726168846537profilepage.png?alt=media&token=8e874920-f60d-4f3d-b56f-c31bc27a840c"
  return (
    <div className=' bg-background mx-auto'>
      <div className='flex flex-col md:flex-row'>
        <DashSidebar />
        <div className='w-2/3 mx-auto'>
          {tab==="profile" && <DashProfile/>}
          {tab==="posts" && <DashPosts/>}
          
        </div>
      </div>
    </div>
    
  );
}
{/* <div
      className={`min-h-screen flex flex-col md:flex-row text-text bg-background bg-cover bg-no-repeat`}
      style={{ backgroundImage: `url(${profilePage})` }}
    >
      {/* Sidebar */
      // <div className="md:max-w-md">
        // <DashSidebar />
      // </div>

      /* Main Content based on selected tab */}
      // {tab === 'profile' && <DashProfile />}
      // {tab === 'posts' && <DashPosts />}
  // </div>
//  */}
