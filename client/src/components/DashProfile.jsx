import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { app } from "../firebase";
import { toast } from "react-toastify";

import {
  updateFailure,
  updateStart,
  updateSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOut
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import Skill from "./Skill";
export default function DashProfile() {
  const { currentUser,loading,error } = useSelector((state) => state.user);
  const [image, setImage] = React.useState(null);
  const [progress, setProgress] = React.useState(null);
  const [imageUploadError, setImageUploadError] = React.useState(null);
  const [imageURL, setImageURL] = React.useState(null);
  const [formData, setFormData] = React.useState(
    currentUser
  );
  const [imageUploading, setImageUploading] = React.useState(false);
  const [popup, setPopup] = React.useState(false);
  const filePicker = useRef();
  console.log(popup);
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  useEffect(() => {
    if (image) {
      upload();
    }
  }, [image]);
  const upload = () => {
    setImageUploadError(null);
    setImageUploading(true);
    toast.warning("Uploading image please wait");
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress.toFixed(0));
      },
      (error) => {
        setImageUploadError("image must be less than 2mb or add only image");
        setProgress(null);
        setImage(null);
        setImageURL(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageURL(downloadURL);
          toast.success("image uploaded successfully");
          setFormData({ ...formData, profilePic: downloadURL });
          setImageUploading(false);
        });
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData) == 0) {
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        console.log(error);
        toast.error(data.message);
      } else {
        dispatch(updateSuccess(data));
        setFormData(data);
        toast.success("Profile updated successfully");
      }
    } catch (err) {
      dispatch(updateFailure(err.message));
      toast.error(err.message);
    }
  };
  const deleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(error.message);
        dispatch(deleteUserFailure(data))
      } else {
        toast.success(data.message);
        dispatch(deleteUserSuccess())
        navigate("/sign-up");
        
      }
    } catch (error) {
      toast.error(error.message);
      dispatch(deleteUserFailure(error.message))
    }
  };
  const handleSignOut=async()=>{
    try{
      const res=await fetch("/api/user/sign-out",{
        method:'POST',
      })
      const data=await res.json();
      console.log(data)
      if(!res.ok){
        toast.error(data.message);
      }
      else{
        toast.success("sign out successful")
        dispatch(signOut());
        navigate("/sign-in")
      }
    }
    catch(error){
        toast.error(error.message);
    }
  }
  console.log(formData);
  const profilePage="https://firebasestorage.googleapis.com/v0/b/mern-blog-c5a1f.appspot.com/o/1726303499430profilepage.png?alt=media&token=32ed2585-e33b-461c-a94a-a1fe6c238fe4"
  return (
    <motion.div initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }} className="bg-gradient-to-tr from-background via-gray-900 to-black m-2 p-4 rounded-lg shadow-md">
      <form className="" onSubmit={handleSubmit}>
      <h1 className="text-center text-text text-4xl my-6 font-semibold">Your Personal Profile Info</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
          
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePicker}
          />
        <div  className=" self-center mx-auto w-32 h-32 rounded-full shadow-lg overflow-hidden relative">
          
          {progress && (
            <CircularProgressbar
            value={progress}
            text={`${progress}%`}
            strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rga(63,123,125,${progress / 100})`,
                },
              }}
              />
            )}
          <img
            src={imageURL ? imageURL : currentUser.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-borderFocus ${
              0 < progress && progress < 100 && "blur-2xl"
            }`}
            onClick={() => filePicker.current.click()}
            />
        </div>
        <div className="flex ">
          <Skill  formData={formData} setFormData={setFormData} />
        </div>
        <div className="mb-2">
        <label htmlFor="Name" className="block text-gray-700 mb-2">
              Name
            </label>
        <input
          type="text"
          id="name"
          placeholder="name"
          
          defaultValue={currentUser.name}
          onChange={handleChange}
          />
        </div>
        <div className="mb-4">
        <label htmlFor="Username" className="block text-gray-700 mb-2">
              Username
            </label>
        <input
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
          />
        </div>
        <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
        <input
          type="email"
          id="email"
          placeholder="email"
          className="hover:cursor-not-allowed "
          defaultValue={currentUser.email}
          disabled={true}
          onChange={handleChange}
          />
          </div>
          <div className="mb-4">
        <label htmlFor="Bio" className="block text-gray-700 mb-2">
              Bio
            </label>
        <input
          type="text"
          id="bio"
          placeholder=""
          defaultValue={currentUser?.bio}
          onChange={handleChange}
          />
        </div>
        <div className="mb-4">
        <label htmlFor="Qualification" className="block text-gray-700 mb-2">
              Qualification
            </label>
        <input
          type="text"
          id="qualification"
          placeholder=""
          defaultValue={currentUser?.qualification}
          onChange={handleChange}
          />
        </div>
        <div className="mb-4">
        <label htmlFor="Oranization" className="block text-gray-700 mb-2">
              working/studing in
            </label>
        <input
          type="text"
          id="organization"
          placeholder="Comapny/College"
          defaultValue={currentUser?.organization}
          onChange={handleChange}
          />
        </div>
        <div className="mb-4">
        <label htmlFor="location" className="block text-gray-700 mb-2">
              Location
            </label>
        <input
          type="text"
          id="location"
          placeholder="city"
          defaultValue={currentUser?.location}
          onChange={handleChange}
          />
        </div>
        
        <div className="mb-4">
        <label htmlFor="Experience" className="block text-gray-700 mb-2">
              Experience
            </label>
        <input
          type="number"
          id="experience"
          placeholder="Years of experience"
          defaultValue={currentUser?.experience}
          onChange={handleChange}
          />
        </div>
        <div className="mb-4">
        <label htmlFor="proflie" className="block text-gray-700 mb-2">
             Profile
            </label>
        <input
          type="text"
          id="profile"
          placeholder="profile exmaple: web developer"
          defaultValue={currentUser?.profile}
          onChange={handleChange}
          />
        </div>
        <div className="mb-4">
        <label htmlFor="github" className="block text-gray-700 mb-2">
             Github Username
            </label>
        <input
          type="text"
          id="github"
          placeholder="Github Username"
          defaultValue={currentUser?.github}
          onChange={handleChange}
          />
        </div>
        <div className="mb-4">
        <label htmlFor="linkedin" className="block text-gray-700 mb-2">
             linkedin url
            </label>
        <input
          type="text"
          id="linkedin"
          placeholder="linkedin url"
          defaultValue={currentUser?.linkedin}
          onChange={handleChange}
          />
        </div>
        <div className="mb-4">
        <label htmlFor="x" className="block text-gray-700 mb-2">
             X url
            </label>
        <input
          type="text"
          id="x"
          placeholder="x"
          defaultValue={currentUser?.x}
          onChange={handleChange}
          />
        </div>

        <div className="mb-4">
        <label htmlFor="Password" className="block text-gray-700 mb-2">
              Password
            </label>
        <input
          type="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
          />
        </div>
        </div>
        <div className="mb-4">
        <label htmlFor="Summary" className="block text-gray-700 mb-2">
              Summary
            </label>
        <textarea
          type="text"
          id="summary"
          placeholder="Summary upto 200 characters"
          defaultValue={currentUser?.summary}
          onChange={handleChange}
          />
        </div>
        <button
          disabled={imageUploading || loading}
          className=" text-white bg-primary mb-4 w-full font-semibold p-2 rounded-lg shadow-md"
          type="submit"
          >
          {loading ? "Loading..." : "Update"}
        </button>
        {currentUser && (
          <Link to={"/create-post"} >
            <button type="button" className=" text-white w-full bg-secondary font-semibold p-2 rounded-lg shadow-md">
              Create Post
            </button>
          </Link>
        )}
      </form>
      <div className="text-linkHover flex mt-5 justify-between">
        <span className="cursor-pointer" onClick={() => setPopup(true)}>
          delete account
        </span>
        <span className="cursor-pointer" onClick={handleSignOut}>Sign out</span>
      </div>
      {imageUploadError && toast.error(imageUploadError)}
      {popup && (
        <Popup 
        open={popup}
        className=" bg-background  "
        closeOnDocumentClick
        onClose={() => setPopup(false)}
        >
          <div className="p-4  bg-background text-text">
            <h1 className="text-center text-2xl font-semibold">
              Are you sure you want to delete your account?
            </h1>
            <p className="text-center text-lg">This action can't be undone</p>
            <div className="flex justify-between gap-4 mt-4">
              <button
                className="bg-background text-white px-4 py-2 rounded-lg"
                onClick={() => setPopup(false)}
                >
                cancel
              </button>
              <button
                className="bg-highlight text-white px-4 py-2 rounded-lg"
                onClick={deleteAccount}
                >
                delete
              </button>
            </div>
          </div>
        </Popup>
      )}
    </motion.div>
  );
}
