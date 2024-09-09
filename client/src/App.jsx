import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
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

export default function App() {
  return ( 
    <BrowserRouter>
    <ToastContainer/>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route element={<PrivateRoute/>}>
           <Route path='/dashboard' element={<DashBoard/>}/>
           <Route path='/edit-post/:postId' element={<CreatePost/>}/>
            <Route path='/create-post' element={<CreatePost/>}/>
        </Route>
        <Route path='/projects' element={<Projects/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}
