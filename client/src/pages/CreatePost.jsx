import React, { useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import "react-circular-progressbar/dist/styles.css";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import Skill from "../components/Skill";
import { useSelector } from "react-redux";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import 'highlight.js/styles/github.css';  // Import Highlight.js theme for syntax highlighting
import hljs from 'highlight.js'; 
import '../index.css';

export default function CreatePost() {
  const postId = useLocation().pathname.split("/")[2];
  const { currentUser } = useSelector((state) => state.user);
  console.log(postId);
  const filePicker = useRef();
  const [skills, setSkills] = useState([]);
  const [images, setImages] = useState([]);
  const [imageProgress, setImageProgress] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [formData, setFormData] = useState({
    skills: [],
    author: currentUser.username,
    authorProfilePicture: currentUser.profilePicture,
  });



  const navigate = useNavigate();
  useEffect(() => {
    const fetchPost = async () => {
      if (postId == undefined) {
        return;
      }
      try {
        const res = await fetch(`/api/posts/get-post/${postId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (res.ok) {
          setFormData(data.post);
          setSkills(data.post.skills);
          setUploadedImages(data.post.images);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
  }, [postId]);
  const toolbarOptions = [
    [{ 'header': '1'}, { 'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote',],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['align','code-block'],
    ['clean'] // remove formatting button
  ];

  const handleImageUpload = async () => {
    setImageProgress(true);
    if (!images.length) {
      setImageUploadError("Please select at least one image to upload");
      toast.error("Please select at least one image to upload");
      setImages([]);
      return;
    }
    if (uploadedImages.length + images.length > 10) {
      setImageUploadError("You can upload a maximum of 10 images at a time");
      toast.error("You can upload a maximum of 10 images at a time");
      return;
    }

    const storage = getStorage(app);

    images.forEach((image, index) => {
      const fileName = new Date().getTime() + image.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          // console.log(error);
          setImageUploadError(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // console.log('File available at', downloadURL);
            setUploadedImages((prevUrls) => {
              const updatedUrls = [...prevUrls, downloadURL];

              // Update the formData with the latest uploaded images
              setFormData((prevData) => ({
                ...prevData,
                images: updatedUrls,
              }));

              return updatedUrls;
            });
            setImageUploadError(null);
            setImageProgress(false);
          });
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    console.log("submitting");
    setFormData({ ...formData, author: currentUser.username,authorProfilePicture: currentUser.profilePicture });
    
    e.preventDefault();
    if (
      formData.title === "" ||
      formData.content === "" ||
      formData.category === "" ||
      formData.images === ""
    ) {
      return toast.error("Please fill all the fields");
    }
    try {
      const response = await fetch("/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!data.success) {
        toast.error(data.message);
      }
      if (response.ok) {
        console.log(data);
        toast.success("Post Created");
        navigate(`/post/${data._id}`);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  const handleEdit = async (e) => {
    console.log("edit");
    setFormData({ ...formData, author: currentUser.username, authorProfilePicture: currentUser.profilePicture });
    e.preventDefault();
    if (
      formData.title === "" ||
      formData.content === "" ||
      formData.category === "" ||
      formData.images === ""
    ) {
      return toast.error("Please fill all the fields");
    }
    try {
      const res = await fetch(`/api/posts/edit-post/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
      }
      if (res.ok) {
        toast.success(data.message);
        navigate(`/post/${data._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleImageDelete = (index) => {
    setUploadedImages((prevUrls) => {
      const updatedUrls = prevUrls.filter((urls, i) => i !== index);
      setFormData((prevData) => ({
        ...prevData,
        images: updatedUrls,
      }));
      return updatedUrls;
    });
  };
  console.log(formData);

  return (
    <div className="p-3 w-full min-h-screen bg-background text-text ">
      <form
        className="flex flex-col max-w-5xl mx-auto gap-4"
        onSubmit={postId ? handleEdit : handleSubmit}
      >
        <h1 className="text-4xl text-center font-semibold my-6">Create Post</h1>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <input
            type="text"
            placeholder="Title"
            value={formData?.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className={`p-2  outline-none rounded-md`}
          />
          <input
            type="text"
            placeholder="Category"
            value={formData?.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className={`p-2  outline-none rounded-md`}
          />
        </div>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
        <input
            type="text"
            placeholder="Github Link"
            value={formData?.githublink}
            onChange={(e) =>
              setFormData({ ...formData, githublink: e.target.value })
            }
            className={`p-2  outline-none rounded-md`}
          />
          <input
            type="text"
            placeholder="Deployed Link"
            value={formData?.livelink}
            onChange={(e) =>
              setFormData({ ...formData, liveLink: e.target.value })
            }
            className={`p-2  outline-none rounded-md`}
          />
          </div>
        <div className="flex gap-4 items-center justify-between border-4 border-highlight border-dotted p-3">
          <input
            type="file"
            className="hidden"
            accept="image/*"
            multiple
            onChange={(e) => setImages([...e.target.files])}
            ref={filePicker}
          />
          <div
            className="hover:cursor-pointer bg-borderFocus font-semibold text-black p-2 "
            onClick={() => filePicker.current.click()}
          >
            Select images {images.length > 0 && `(${images.length})`}
          </div>

          <button
            disabled={imageProgress}
            type="button"
            className="border bg-primary p-3 relative rounded-md font-semibold"
            onClick={handleImageUpload}
          >
            {imageProgress ? "Uploading..." : "Upload Images"}
          </button>
        </div>
        {imageUploadError && <p className="text-red-500">{imageUploadError}</p>}
        {uploadedImages?.length > 0 && (
          <div className="grid grid-cols-5 md:grid-cols-7 gap-2">
            {uploadedImages.map((url, index) => {
              return (
                <div className="relative">
                  <img
                    key={index}
                    src={url}
                    alt="Uploaded"
                    className="h-20 w-20 object-cover rounded-md"
                  />
                  <div className="absolute top-0 right-0 p-1 cursor-pointer">
                    <FaRegTrashAlt
                      className="text-red-500"
                      onClick={() => handleImageDelete(index)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <Skill formData={formData} setFormData={setFormData} />
        <ReactQuill modules={{ toolbar: toolbarOptions }}
          onChange={(value) => setFormData({ ...formData, content: value })}
          theme="snow" 
          value={formData?.content}
          placeholder="Write something amazing..."
          className={`h-72 pb-12 bg-background `}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          type="submit"
          className="bg-secondary p-3 rounded-md mb-10 font-semibold "
        >
          {postId ? "Edit" : "Add"} Project
        </motion.button>
      </form>
    </div>
  );
}
