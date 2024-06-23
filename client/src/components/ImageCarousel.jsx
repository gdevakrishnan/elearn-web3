import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import carousel1 from '../assets/carousel1.jpg';
import carousel2 from '../assets/carousel2.jpg';
import carousel3 from '../assets/carousel3.jpg';

const ImageCarousel = () => {
  return (
    <div className="carousel">
      <Carousel autoPlay interval={3000} infiniteLoop showThumbs={false} showStatus={false}>
        <div className='image'>
          <img className='carousel_image' src={carousel1} alt="Image 1" />
        </div>
        <div className='image'>
          <img className='carousel_image' src={carousel2} alt="Image 2" />
        </div>
        <div className='image'>
          <img className='carousel_image' src={carousel3} alt="Image 3" />
        </div>
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
