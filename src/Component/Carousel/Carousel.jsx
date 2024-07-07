import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import {Images} from './Images/data';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 
import classes from "./Carousel.module.css";

function CarouselEffect() {
  return (
    <div className={classes.Carousel_part}>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={true}
        showThumbs={false}
      >
        {Images.map((imageItemLink, index) => (
          <div key={index}>
            <img src={imageItemLink} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselEffect;



