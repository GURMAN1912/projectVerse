import React from 'react'
import { useSelector } from 'react-redux'
export default function ThemeProvider({children}) 
{
    const {theme}=useSelector(state=>state.theme)
  return (
        <div className={`${theme === 'light' ? 'bg-white' : 'bg-neutral-900 text-gray-200'} min-h-screen`} >
            {children}
        </div>
    
  )
}
