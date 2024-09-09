import React from 'react'
import{getAuth, GoogleAuthProvider, signInWithPopup} from'firebase/auth'
import { app } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'
export default function OAuth() {
  const auth = getAuth(app)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleClick = async () =>{
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({ prompt: 'select_account' })
      try {
          const resultsFromGoogle = await signInWithPopup(auth, provider)
          console.log(resultsFromGoogle)
          const res = await fetch('/api/auth/google', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  name: resultsFromGoogle.user.displayName,
                  email: resultsFromGoogle.user.email,
                  googlePhotoUrl: resultsFromGoogle.user.photoURL,
              }),
              })
          const data = await res.json()
          if (res.ok){
              dispatch(signInSuccess(data))
              navigate('/')
          }
      } catch (error) {
          console.log(error);
      }
  } 
  return (
    <button onClick={handleClick} type='button' className=' items-center bg-secondary text-white p-2 rounded-lg'>
      Continue with Google
    </button>
  )
}
