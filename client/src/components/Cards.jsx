import React from 'react'
import { motion } from 'framer-motion'
import Popup from 'reactjs-popup';
import { useNavigate } from 'react-router-dom';

export default function Cards({post,fetchPosts}) {
    const [popup, setPopup] = React.useState(false);
    const navigate=useNavigate();
    const deletePost = async () => {
        try {
          const res = await fetch(`/api/posts/delete-post/${post._id}`, {
            method: "DELETE",
          });
          const data = await res.json();
          if (res.ok) {
            setPopup(false);
            toast.success(data.message);
          }
          if (!res.ok) {
            toast.error(data.message);
          }
        } catch (err) {
          console.log(err);
        }
    }
    const postPage=()=>{
      navigate(`/post/${post._id}`);
    }
    const editPost=()=>{
      navigate(`/edit-post/${post._id}`);
    }
  return (
    <motion.div whileHover={{ scale: 1.02 }} 
     className='bg-primary max-h-[296px] rounded-lg '>
    <div className='flex flex-col justify-between p-2'>
      <img
        src={post.images[0] || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
        alt='post'
        className=' h-32 mx-auto rounded-full object-cover'
      />
    </div>
    <div className='p-3 text-center'>
      <h1 className='font-semibold text-2xl hover:underline hover:text-linkHover cursor-pointer mb-1'onClick={postPage}>{post.title.length > 10 ? `${post.title.substring(0, 10)}...` : post.title}
      </h1>
      <p className='text-sm text-gray-400'>{post.category}</p>
    </div>
    <div className='flex justify-evenly p-3'>
      <button onClick={editPost} className='bg-secondary px-4 rounded-md font-semibold text-white hover:bg-secondary-dark'>
        Edit
      </button>
      <button onClick={()=>setPopup(!popup)} className='bg-highlight p-2 rounded-md font-semibold text-white hover:bg-red-600'>
        Delete
      </button>
    </div>
    {popup && (
        <Popup 
          open={popup}
          className=" bg-primary "
          closeOnDocumentClick
          onClose={() => setPopup(false)}
        >
          <div className="p-4  bg-primary text-text">
            <h1 className="text-center text-2xl font-semibold">
              Are you sure you want to delete your post with the title- {post.title}?
            </h1>
            <p className="text-center text-lg">This action can't be undone</p>
            <div className="flex justify-between gap-4 mt-4">
              <button
                className="bg-background font-semibold text-white px-4 py-2 rounded-lg"
                onClick={() => setPopup(false)}
              >
                Cancel
              </button>
              <button
                className="bg-highlight font-semibold text-white px-4 py-2 rounded-lg" onClick={deletePost}
              >
                Delete
              </button>
            </div>
          </div>
        </Popup>
      )}
  </motion.div>
  
  )
}
