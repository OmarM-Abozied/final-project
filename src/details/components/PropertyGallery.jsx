import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaVrCardboard } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import "./PropertyGallery.css";

const PropertyGallery = () => {
  const { state: property } = useLocation();
  const images = property?.images || []; // الصور الجاية من العقار

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1: next, -1: prev

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) =>
      images.length ? (prev - 1 + images.length) % images.length : 0
    );
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (images.length ? (prev + 1) % images.length : 0));
  };

  if (!images.length) {
    return (
      <div className="property-gallery">
        <p className="no-images">No images available for this property.</p>
      </div>
    );
  }

  return (
    <div className="property-details">
      <div className="property-gallery">
        <div className="gallery-main">
          <img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Property image ${currentIndex + 1}`}
            className="main-image"
            style={{
              transform: `translateX(${direction * 100}%)`,
              animation: `slide 0.7s forwards`,
            }}
          />

          <div className="gallery-nav">
            <button onClick={handlePrev}>
              <FaChevronLeft />
            </button>
            <button onClick={handleNext}>
              <FaChevronRight />
            </button>
          </div>

          <div className="vr-badge">
            <FaVrCardboard /> View in VR
          </div>
        </div>

        <div className="gallery-thumbs">
          {images.map((src, i) => (
            <div
              key={i}
              className={`thumb ${i === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(i)}
            >
              <img src={src} alt={`Thumbnail ${i + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyGallery;
