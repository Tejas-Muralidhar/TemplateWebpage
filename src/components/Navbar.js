import React, { useState } from "react";
import { scroller } from "react-scroll"; 
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (section) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: section } }); 
    } else {
      scroller.scrollTo(section, { smooth: true, duration: 500, offset: -100 }); 
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        {/* Logo */}
        <div className="logo-container" onClick={() => handleNavigation("home")} style={{"cursor": "pointer"}}>
          <img src="/assets/Navbar/uandi_logo.png" height={100} width={100} alt="U&I Logo" />
          <div className="logo">x</div>
          <img id="LakshyaLogo" src="/assets/Navbar/LakshyaLogo.png" height={50} width={200} alt="Lakshya Logo" />
        </div>

        {/* Desktop Navigation */}
        <ul className="desktop-nav">
          <li onClick={() => handleNavigation("home")} className="scroll-link">Home</li>
          <li onClick={() => handleNavigation("about")} className="scroll-link">About</li>
          <li onClick={() => handleNavigation("impact-section")} className="scroll-link">Impact Stories</li>
          <li onClick={() => handleNavigation("gallery-container")} className="scroll-link">Gallery</li>
          <li onClick={() => handleNavigation("experiences")} className="scroll-link">Experiences</li>

          {/* Dropdown Menu for LINKS */}
          <li
            className="dropdown scroll-link"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            Links
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                <li><a href="https://uandi.org.in/volunteer" target="_blank" rel="noopener noreferrer">Sign Up</a></li>
                <li><a href="https://build.uandi.org.in/" target="_blank" rel="noopener noreferrer">Build: Student Logs</a></li>
                <li><a href="https://trainingandresources2024.softr.app/teacher-resources" target="_blank" rel="noopener noreferrer">Teaching Resources</a></li>
              </ul>
            )}
          </li>
          <li onClick={() => handleNavigation("contact")} className="scroll-link">Contact</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
