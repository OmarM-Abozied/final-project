import React from "react";
import {
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaCar,
  FaCheckCircle,
  FaPhone,
  FaEnvelope,
  FaRobot,
  FaWhatsapp,
} from "react-icons/fa";
import "./PropertyInfo.css";
import { useLocation } from "react-router-dom";

const PropertyInfo = () => {
  const { state: property } = useLocation();

  return (
    <div className="property-info">
      <h2>{property?.title || "Property Title"}</h2>
      <p className="location flex gap-2 items-center">
        <FaMapMarkerAlt />{" "}
        {property?.address || "123 Coastal Drive, Malibu, CA"}
      </p>

      <div className="property-meta">
        <div className="meta-item">
          <FaBed /> {property?.bedrooms || 4} Bedrooms
        </div>
        <div className="meta-item">
          <FaBath /> {property?.bathrooms || 3} Bathrooms
        </div>
        <div className="meta-item">
          <FaRulerCombined /> {property?.area || "3,200"} sq ft
        </div>
        {/* <div className="meta-item">
          <FaCar /> {property?.garage || 2} Garage
        </div> */}
      </div>

      <div className="property-description">
        <h3>Description</h3>
        <p>{property?.description || "No description available."}</p>
      </div>

      <h3 className="feTitle">Features</h3>
      <div className="features">
        {(
          property?.features || [
            "Smart Home System",
            "Infinity Pool",
            "Security System",
          ]
        ).map((feat, idx) => (
          <div className="feature" key={idx}>
            <FaCheckCircle /> {feat}
          </div>
        ))}
      </div>

      {/* ✅ Nearby Section */}
      {property?.location?.nearBy?.length > 0 && (
        <div className="nearby-section">
          <h3 className="feTitle">Nearby Places</h3>
          <div className="nearby-list">
            {property.location.nearBy.map((place, idx) => (
              <span key={idx} className="nearby-item">
                <FaMapMarkerAlt className="inline-block mr-1 text-orange-500" />
                {place}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const PropertySidebar = () => {
  const { state: property } = useLocation(); // ✅ جلب البيانات هنا كمان

  return (
    <div className="property-sidebar">
      <div className="price">
        {property?.price ? `$${property.price.toLocaleString()}` : "$3,450,000"}
      </div>
      <p>Schedule a viewing or request more information about this property</p>

      <div className="contact-buttons">
        {/* <div className="contact-btn btn-call">
          <FaPhone /> Call Owner
        </div> */}
        <div className="contact-btn btn-email">
          <FaEnvelope /> Chat with Owner
        </div>

        {/* <div className="contact-btn btn-whatsapp">
          <FaWhatsapp /> WhatsApp
        </div> */}
      </div>

      <div className="ai-assistant">
        <h3>
          <FaRobot /> Property AI Assistant
        </h3>
        <p>
          Hi! I can help you understand this property's features, value
          comparison, and answer any questions.
        </p>
        <input
          type="text"
          className="ai-input"
          placeholder="Ask about this property..."
        />
        <button className="ai-btn">Ask Question</button>
      </div>
    </div>
  );
};

const Chatbot = () => (
  <div className="chatbot">
    <i className="fas fa-comment-alt"></i>
  </div>
);

const PropertyPage = () => (
  <div className="property-content">
    <PropertyInfo />
    <PropertySidebar />
    <Chatbot />
  </div>
);

export default PropertyPage;
