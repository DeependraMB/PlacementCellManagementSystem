import React from "react";
import { useEffect, useState } from "react";
import './Banner.css'

const imageUrls = ["1a.jpg","15.jpg"];

function Banner() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);


  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };
  const backgroundImageStyle = {
    backgroundImage: `url(${imageUrls[currentImageIndex]})`,
    animation: "fade 1s linear forwards",
  };

  return (
    <div className="container-fluid my-5">
      <div className="banner-container" style={backgroundImageStyle}>
      <button className="banner-arrow prev" onClick={prevImage}>
        &lt;
      </button>
      <button className="banner-arrow next" onClick={nextImage}>
        &gt;
      </button>
      </div>
      
    </div>
  );
}

export default Banner;
