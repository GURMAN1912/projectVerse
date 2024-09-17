import React, { forwardRef } from 'react'

const Skillbox=forwardRef(({language })=> {
  return (
    <div  className='gradient-bg p-2 text-text  rounded-lg hover:opacity-80 hover:cursor-pointer '>
      {language}
    </div>
  )
});
export default Skillbox;
