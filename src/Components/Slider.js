import React, { useState, useEffect } from "react";
import carImage1 from "../images/1.jpg";
import carImage2 from "../images/2.jpg";
import carImage3 from "../images/3.jpg";

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [carImage1, carImage2, carImage3];

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "60vh",
        margin: "auto",
        position: "relative",
      }}
    >
      <img
        src={images[activeIndex]}
        alt={`Car ${activeIndex + 1}`}
        style={{ width: "100%", height: "60vh" }}
        h
      />
    </div>
  );
};

export default Carousel;
