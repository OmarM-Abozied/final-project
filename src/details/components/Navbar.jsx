import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";

const Navbar = () => {
  // ✅ تغيير لون الـ Navbar لما المستخدم ينزل بالسكرول
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector(".navbar");
      if (window.scrollY > 50) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container">
        <a className="navbar-brand" href="/">
          <i className="fas fa-home me-2"></i>DreamHome
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/properties">Properties</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/details">Details</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/dashboard">Dashboard</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">Contact</a>
            </li>
          </ul>
          <a href="/register" className="btn btn-warning ms-3">Register</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
