import React from 'react'

export default function AboutSection({summary,email,location,qualifiaction,experience,organization}) {
  return (
    <div className='bg-gray-800 flex h-screen '>

    <div class="bg-gray-800 flex flex-col md:w-3/5 m-auto w-full text-center text-white p-4 rounded-lg">
  <h2 class="text-4xl font-semibold mb-4">About Me</h2>
  <hr />

  <p className='my-2'>{summary}
  </p>
  <div class="grid   
 grid-cols-2 gap-4 mt-4">
    <div>
      <p class="text-gray-400">Email:</p>
      <p class="text-gray-300 sm:text-md text-sm ">{email}</p>
    </div>
    
    <div>
      <p class="text-gray-400">Location:</p>
      <p class="text-gray-300">{location}</p>
    </div>
    <div>
      <p class="text-gray-400">Education:</p>
      <p class="text-gray-300">{organization}</p>
    </div>
    <div>
      <p class="text-gray-400">Degree:</p>
      <p class="text-gray-300">{qualifiaction}</p>
    </div>
  </div>
  <div class="grid grid-cols-2 gap-4 mt-4">
    <div class="flex flex-col items-center justify-center bg-gray-900 text-white p-4 rounded-lg">
      <h3 class="text-3xl text-secondary font-bold">{experience}+</h3>
      <p class="text-gray-400">Years of Experience</p>
    </div>
    <div class="flex flex-col items-center justify-center bg-gray-900 text-white p-4 rounded-lg">
      <h3 class="text-3xl text-secondary font-bold ">50+</h3>
      <p class="text-gray-400">Completed Projects</p>
    </div>
  </div>
</div>
     </div>
  )
}
