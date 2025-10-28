// App.jsx
import React from "react";
import Navbar from '../home_page/components/Navbar.jsx';
// import HeroSection from "./components/Hero";
import PropertyGallery from "./components/PropertyGallery";
import PropertyPage from "./components/PropertyInfo";
import Chatbot from "./components/ChatbotButton";
import Footer from "../home_page/components/Footer.jsx";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <div className="main-content">
        {/* <HeroSection /> */}
        <PropertyGallery />
        <PropertyPage />
      </div>

      {/* Chatbot fixed */}
      <Chatbot />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
