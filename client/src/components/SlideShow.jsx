import React, { useState } from "react";
import { motion, AnimatePresence, wrap } from "framer-motion";
import "react-slideshow-image/dist/styles.css";
import { Fade } from 'react-slideshow-image';
import { Audio } from "react-loader-spinner";

export default function SlideShow({ images, loading }) {
  console.log(images);
  console.log(loading);

  return (
    <div className="bg-black bg-gradient-to-tr from-background via-gray-900 to-black justify-items-center w-full h-[400px]">
      {loading ? (
        <div className="flex justify-center items-center h-[400px]">
          <h1 className="text-3xl text-white">
            <Audio
              height="80"
              width="80"
              radius="9"
              color="black"
              ariaLabel="loading"
              wrapperStyle
              wrapperClass
            />
          </h1>
        </div>
      ) : (
        <Fade>
          {images.map((image, index) => (
            <div key={index} className="flex justify-center">
              <img src={image} alt="slide" className="h-[400px] object-fill " />
            </div>
          ))}
        </Fade>
      )}
    </div>
  );
}
