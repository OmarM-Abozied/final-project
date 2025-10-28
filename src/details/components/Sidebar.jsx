import React from "react";
import { FaPhone, FaEnvelope, FaRobot, FaWhatsapp } from "react-icons/fa";
import "./Sidebar.css";

const PropertySidebar = ({ price, onCall = ()=>{}, onEmail = ()=>{}, onWhatsapp = ()=>{} }) => {
  return (
    <aside className="property-sidebar">
      <div className="price">{price}</div>
      <p>Schedule a viewing or request more information about this property</p>

      <div className="contact-buttons">
        <button className="contact-btn btn-call" onClick={onCall}>
          <FaPhone /> &nbsp; Call Owner
        </button>
        <button className="contact-btn btn-email" onClick={onEmail}>
          <FaEnvelope /> &nbsp; Email Owner
        </button>
        <button className="contact-btn btn-whatsapp" onClick={onWhatsapp}>
          <FaWhatsapp /> &nbsp; WhatsApp
        </button>
      </div>

      <div className="ai-assistant">
        <h3><FaRobot /> &nbsp; Property AI Assistant</h3>
        <p>Hi! I can help you understand this property's features, value comparison, and answer any questions.</p>
        <input type="text" placeholder="Ask about this property..." style={{ width: "100%", padding: 12, border: "1px solid #ddd", borderRadius: 4, marginBottom: 10 }} />
        <button className="btn" style={{ width: "100%" }}>Ask Question</button>
      </div>
    </aside>
  );
};

export default PropertySidebar;
