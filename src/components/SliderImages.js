import React from "react";
import image1 from '../images/alyssa-strohmann-qOIGvGoVNtc-unsplash.jpg'
import image2 from '../images/anastasia-anastasia-nlQFycTD04M-unsplash.jpg'
import image3 from '../images/lilartsy-ZhmbakzCBtk-unsplash.jpg'
import "../stylesheets/ImageSlider.css";
const SliderImages = () => {
  return (
    <div className="slider">
      <div className="slider-images">
        <img src={image1} alt="Image 1" />
        <img src={image2} alt="Image 2" />
        <img src={image3} alt="Image 3" />
      </div>
    </div>
  );
};

export default SliderImages;
