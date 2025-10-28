import React from "react";
import "./Hero.css";

const HeroSection = () => {
  return (
    <section id="home" className="hero">
      {/* Animated background elements */}
      <div className="hero-particles">
        {Array.from({ length: 9 }).map((_, i) => (
          <div className="particle" key={i}></div>
        ))}
      </div>

      <div className="hero-shape"></div>
      <div className="hero-shape"></div>
      <div className="hero-shape"></div>

      {/* ✅ container-full بدل container العادية */}
      <div className="container-full">
        <div className="hero-content">
          <h1>Find Your Dream Home</h1>
          <p>Discover the perfect property in the most desirable neighborhoods</p>

          <div className="search-container">
            <form className="search-form" onSubmit={(e) => e.preventDefault()}>
              <div className="search-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  placeholder="Enter city, neighborhood..."
                />
              </div>

              <div className="search-group">
                <label htmlFor="property-type">Property Type</label>
                <select id="property-type">
                  <option>Any Type</option>
                  <option>House</option>
                  <option>Apartment</option>
                  <option>Condo</option>
                  <option>Townhouse</option>
                </select>
              </div>

              <div className="search-group">
                <label htmlFor="price-range">Price Range</label>
                <select id="price-range">
                  <option>Any Price</option>
                  <option>$100k - $300k</option>
                  <option>$300k - $500k</option>
                  <option>$500k - $1M</option>
                  <option>$1M+</option>
                </select>
              </div>

              <div className="search-group">
                <button type="submit" className="search-btn">
                  <i className="fas fa-search me-2"></i>Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
