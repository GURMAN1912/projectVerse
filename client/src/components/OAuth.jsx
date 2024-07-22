import React from 'react'
import{getAuth, GoogleAuthProvider, signInWithPopup} from'firebase/auth'
import { app } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'
export default function OAuth() {
    const auth=getAuth(app)
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const handleClick=async()=>{
          const provider=new GoogleAuthProvider();
          provider.getCustomParameters({prompt:"select-account"});
          try {
              const result=await signInWithPopup(auth,provider);
              console.log(result)
              const res=await fetch('api/auth/google',{
                method:'POST',
                headers:{'Content-type':'application/json'},
                body:JSON.stringify({
                    name:result.user.displayName,
                    email:result.user.email,
                    googlePhotoURl:result.user.photoURL,
                })
              })
              const data=await res.json();
              if(res.ok){
                dispatch(signInSuccess());
                navigate('/')
              }
          } catch (error) {
            console.log(error)
          }
    }
  return (
    <button onClick={handleClick} type='button' className=' items-center bg-black text-white p-2 rounded-lg'>
      Continue with Google
    </button>
  )
}
