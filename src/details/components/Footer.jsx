import React from "react";
import "./Footer.css";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaHome,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaMapMarkerAlt
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="row">
        
          <div className="col">
            <h5><FaHome className="me-2" /> DreamHome Realty</h5>
            <p>
              Your trusted partner in finding the perfect home. We're committed
              to making your real estate dreams come true.
            </p>
            <div className="social-icons">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaLinkedinIn /></a>
            </div>
          </div>

          <div className="col">
            <h5>Quick Links</h5>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#properties">Properties</a></li>
              <li><a href="#agents">Agents</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="col">
            <h5>Services</h5>
            <ul>
              <li><a href="#">Buy a Home</a></li>
              <li><a href="#">Sell a Home</a></li>
              <li><a href="#">Rent a Property</a></li>
              <li><a href="#">Property Management</a></li>
              <li><a href="#">Investment Properties</a></li>
            </ul>
          </div>

          <div className="col">
            <h5>Contact Info</h5>
            <ul>
              <li><FaMapMarkerAlt className="me-2" /> 123 Real Estate Ave, City, State 12345</li>
              <li><FaPhone className="me-2" /> (555) 123-4567</li>
              <li><FaEnvelope className="me-2" /> info@dreamhome.com</li>
              <li><FaClock className="me-2" /> Mon - Fri: 9AM - 6PM</li>
            </ul>
          </div>

        </div>

        <div className="copyright">
          <p>&copy; 2024 DreamHome Realty. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
