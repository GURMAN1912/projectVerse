import React from 'react'
import Skillbox from '../container/Skillbox'

export default function TechStack({skills}) {
  return (
    <div className='pb-2'>
        <h1 className='text-2xl py-3 font-semibold'>Tech Stack</h1>
        <div className='flex flex-wrap gap-2 px-2'>
            {skills.map((skill, index) => (
            <Skillbox key={index} language={skill}/>
            ))}
        </div>
        
    </div>
  )
}
