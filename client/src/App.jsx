import React, { useEffect, useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import DashBoard from './pages/DashBoard';
import Projects from './pages/Projects';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreatePost from './pages/CreatePost';
import PostPage from './pages/PostPage';
import ProfilePage from './pages/ProfilePage';
import Scrollbar from 'smooth-scrollbar';
import FollowingPage from './pages/FollowingPage';
import FollowersPage from './pages/FollowersPage';
import SearchPage from './pages/SearchPage';
import PageNotFound from './pages/PageNotFound';

export default function App() {
  const scrollRef = useRef(null);

  useEffect(() => {
    // Initialize smooth-scrollbar
    const scrollbar = Scrollbar.init(scrollRef.current, {
      damping: 0.05,  // Adjust the damping for smoothness
      thumbMinSize: 20,  // Minimum size of scrollbar thumb
    });

    return () => {
      if (scrollbar) scrollbar.destroy();  // Clean up the scrollbar instance on unmount
    };
  }, []);

  return (
    <div ref={scrollRef} style={{ height: '100vh', overflow: 'hidden', backgroundColor:"#0d0d0d" }}>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <div className="main-content">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/profile/:userId' element={<ProfilePage />} />
            <Route path='/search' element={<SearchPage/>} />
            <Route element={<PrivateRoute />}>
              <Route path='/dashboard' element={<DashBoard />} />
              <Route path='/edit-post/:postId' element={<CreatePost />} />
              <Route path='/create-post' element={<CreatePost />} />
              <Route path='/user/following' element={<FollowingPage />} />
              <Route path='/user/followers' element={<FollowersPage />} />
            </Route>
            <Route path='/post/:postId' element={<PostPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
