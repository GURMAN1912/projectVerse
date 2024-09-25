import React, { useState, useEffect } from 'react';
import Cards from './Cards';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom';

export default function MorePosts({ posts , author, userId }) {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
          },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
          slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      };
  return (
    <div className='p-2 mt-2 '>
        <h1 className='text-3xl mb-2'>
            More Posts from the author :
            <Link to={`/profile/${userId}`}  className='hover:text-secondary hover:cursor-pointer'>{author}</Link>
        </h1>
        <hr  className='opacity-25'/>
        {posts.length === 0 && <h1 className='text-2xl text-center mt-4'>No more posts from the author</h1>}

        <Carousel
  infinite
  showDots={false}
  responsive={responsive}
  autoPlay
  
  swipeable
  draggable
  keyBoardControl
  transitionDuration={500}
  containerClass="carousel-container"
>
  {posts.map((item) => (
    <div
      className="p-4 flex  justify-center"
      key={item.id}
    >
      <Cards post={item} />
    </div>
  ))}
</Carousel>

    </div>
  );
}
