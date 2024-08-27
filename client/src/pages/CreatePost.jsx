import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";

export default function CreatePost() {
  const { theme } = useSelector((state) => state.theme);
  const [images, setImages] = useState([]);
  const [imageProgress, setImageProgress] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleImageUpload = async () => {
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
          setImageProgress((prevProgress) => {
            const newProgress = [...prevProgress];
            newProgress[index] = progress;
            return newProgress;
          });
          // console.log(`Upload is ${progress}% done`);
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
            setImageProgress((prevProgress) => {
              const newProgress = [...prevProgress];
              newProgress[index] = 100; // Mark as completed
              return newProgress;
            });
          });
        }
      );
    });
  };

  const handleSubmit = async (e) => {
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
        navigate(`/post/${data.slug}`);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-4xl text-center font-semibold my-6">Create Post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <input
            type="text"
            placeholder="Title"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className={`p-2 ${
              theme === "dark" ? "bg-neutral-800" : "bg-gray-100"
            } outline-none rounded-md`}
          />
          <input
            type="text"
            placeholder="Category"
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className={`p-2 ${
              theme === "dark" ? "bg-neutral-800" : "bg-gray-100"
            } outline-none rounded-md`}
          />
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-pink-400 border-dotted p-3">
          <input
            type="file"
            className=""
            accept="image/*"
            multiple
            onChange={(e) => setImages([...e.target.files])}
          />
          <button
            disabled={imageProgress.some(
              (progress) => progress > 0 && progress < 100
            )}
            type="button"
            className="border bg-teal-500 p-3 relative rounded-md font-semibold"
            onClick={handleImageUpload}
          >
            {imageProgress.some((progress) => progress > 0 && progress < 100)
              ? "Uploading..."
              : "Upload Images"}
          </button>
        </div>
        {imageUploadError && <p className="text-red-500">{imageUploadError}</p>}
        {uploadedImages.length > 0 && (
          <div className="grid grid-cols-5 md:grid-cols-7 gap-2">
            {uploadedImages.map((url, index) => {
              return (
                <img
                  key={index}
                  src={url}
                  alt="Uploaded"
                  className="h-20 w-20 object-cover rounded-md"
                />
              );
            })}
          </div>
        )}
        <ReactQuill
          onChange={(value) => setFormData({ ...formData, content: value })}
          theme="snow"
          placeholder="Write something amazing..."
          className={`h-72 mb-12 bg-gray-50 ${
            theme === "dark" ? "bg-neutral-800" : ""
          }`}
        />
        <button
          type="submit"
          className="bg-pink-500 p-3 rounded-md mb-10 font-semibold"
        >
          Add Project
        </button>
      </form>
    </div>
  );
}
