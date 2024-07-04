import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import DashBoard from './pages/DashBoard';
import Projects from './pages/Projects';
import Header from './components/Header';

export default function App() {
  return (
    <div className='bg-indigo-950'> 
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route path='/dashboard' element={<DashBoard/>}/>
        <Route path='/projects' element={<Projects/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}
