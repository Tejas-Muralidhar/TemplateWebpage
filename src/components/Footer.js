import React from "react";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import "../styles/Footer.css"; // Import CSS file

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Column 1: Logo & Social Media */}
        <div className="footer-column">
          <a href="https://uandi.org" target="_blank" rel="noopener noreferrer">
            <img src="/assets/Footer/uandi_logo_BW.png" alt="U&I Trust Logo" className="footer-logo" />
          </a>
          <div className="footer-social">
            <a href="https://www.facebook.com/uandi.org.in/" target="_blank" rel="noopener noreferrer"><Facebook className="social-icon" /></a>
            <a href="https://www.instagram.com/uandi.org.in/" target="_blank" rel="noopener noreferrer"><Instagram className="social-icon" /></a>
            <a href="https://www.linkedin.com/company/u&i-charity/?viewAsMember=true" target="_blank" rel="noopener noreferrer"><Linkedin className="social-icon" /></a>
            <a href="https://www.youtube.com/channel/UCLiSn1bQSF7O2VGPIHD5E6A/featured" target="_blank" rel="noopener noreferrer"><Youtube className="social-icon" /></a>
          </div>
          <p className="footer-description">
            U&I Trust is dedicated to transforming lives through education, empowerment, and volunteer-driven impact.
          </p>
        </div>

        {/* Column 2: What We Do */}
        <div className="footer-column">
          <h3 className="footer-title">WHAT WE DO</h3>
          <ul className="footer-links">
            <li><a href="https://uandi.org.in/volunteer" target="_blank">Volunteering</a></li>
            <li><a href="https://uandi.my.canva.site/fellowship-2024" target="_blank">Fellowship</a></li>
            <li><a href="https://www.canva.com/design/DAE55FVu9w4/j4ErARvafRu4eoj-zMxChw/view?website#2:apply-now" target="_blank">Internship</a></li>
            <li><a href="https://uandi.org.in/hiring" target="_blank">Work</a></li>
            <li><a href="https://uandi.org.in/csr" target="_blank">CSR Partnership</a></li>
            <li><a href="https://uandi.org.in/donatenow" target="_blank">Donate</a></li>
          </ul>
        </div>

        {/* Column 3: Where We Are */}
        <div className="footer-column">
          <h3 className="footer-title">WHERE WE ARE</h3>
          <p className="footer-text">A: 8/1, Gover Road,</p>
          <p className="footer-text">Cox Town, Bangalore</p>
          <p className="footer-text">560 005</p>
        </div>

        {/* Column 4: Get in Touch */}
        <div className="footer-column">
          <h3 className="footer-title">GET IN TOUCH</h3>
          <p className="footer-text">E: lakshyalearningcenter.uandi@gmail.com</p>
        </div>

      </div>
    </footer>
  );
}
