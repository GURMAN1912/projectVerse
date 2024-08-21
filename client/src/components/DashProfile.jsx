import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [image, setImage] = React.useState(null);
  const [progress, setProgress] = React.useState(null);
  const [imageUploadError, setImageUploadError] = React.useState(null);
  const [imageURL, setImageURL] = React.useState(null);
  const [formData, setFormData] = React.useState({});
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
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        toast.error(data.message);
      } else {
        dispatch(updateSuccess(data));
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
        toast.error(data.message);
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
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="text-center text-4xl my-6 font-semibold">Profile</h1>
      <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePicker}
        />
        <div className=" self-center w-32 h-32 rounded-full shadow-lg overflow-hidden relative">
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
            className={`rounded-full w-full h-full object-cover border-8 border-[#cd5dbc] ${
              0 < progress && progress < 100 && "blur-2xl"
            }`}
            onClick={() => filePicker.current.click()}
          />
        </div>
        <input
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
        />
        <button
          disabled={imageUploading}
          className=" text-white bg-pink-500 font-semibold p-2 rounded-lg shadow-md"
          type="submit"
        >
          Update
        </button>
      </form>
      <div className="text-red-500 flex mt-5 justify-between">
        <span className="cursor-pointer" onClick={() => setPopup(true)}>
          delete account
        </span>
        <span className="cursor-pointer" onClick={handleSignOut}>Sign out</span>
      </div>
      {imageUploadError && toast.error(imageUploadError)}
      {popup && (
        <Popup
          open={popup}
          className=" bg-gray-100"
          closeOnDocumentClick
          onClose={() => setPopup(false)}
        >
          <div className="p-4 bg-gray-100 rounded-lg">
            <h1 className="text-center text-2xl font-semibold">
              Are you sure you want to delete your account?
            </h1>
            <p className="text-center text-lg">This action can't be undone</p>
            <div className="flex justify-between gap-4 mt-4">
              <button
                className="bg-pink-500 text-white px-4 py-2 rounded-lg"
                onClick={() => setPopup(false)}
              >
                cancel
              </button>
              <button
                className="bg-black text-white px-4 py-2 rounded-lg"
                onClick={deleteAccount}
              >
                delete
              </button>
            </div>
          </div>
        </Popup>
      )}
    </div>
  );
}
