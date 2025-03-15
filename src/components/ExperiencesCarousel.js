import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/ExperiencesCarousel.css";
import experiences from "../data/experiences.json";

const ExperiencesSection = () => {

  const [heading, setHeading] = useState("Ready to explore? Hear from the Teacher's themselves!");
    
      useEffect(() => {
        const updateHeading = () => {
          if (window.innerWidth <= 600) {
            setHeading("Our Teachers, Their Stories!");
          } else {
            setHeading("Ready to explore? Hear from the Teacher's themselves!");
          }
        };
    
        // Run on mount
        updateHeading();
    
        // Listen for window resize
        window.addEventListener("resize", updateHeading);
    
        return () => window.removeEventListener("resize", updateHeading);
      }, []);

  const [selectedExperience, setSelectedExperience] = useState(null);
  const [randomExperiences, setRandomExperiences] = useState([]);
  const modalRef = useRef(null);

  // Select 3 random stories
  useEffect(() => {
    const shuffled = [...experiences].sort(() => 0.5 - Math.random());
    setRandomExperiences(shuffled.slice(0, 3));
  }, []);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSelectedExperience(null);
      }
    };

    if (selectedExperience) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedExperience]);

  // Truncate text by character limit instead of word count
  const truncateText = (text, charLimit) => {
    return text.length > charLimit ? text.substring(0, charLimit) + "..." : text;
  };

  return (
    <section className="experiences-section experiences">
      <div className="headingAndCards">
        <div className="experience-header">
          <h4 className="experience-heading">
            {heading}
          </h4>
        </div>

        <div className="experience-grid">
          {randomExperiences.map((exp, index) => (
            <div key={index} className="experience-card" onClick={() => setSelectedExperience(exp)}>
              <img
                src={exp.image}
                alt={exp.name}
                className="volunteer-image-full"
                loading="lazy" // ✅ Lazy loading added
              />
              <div className="experience-content">
                <div className="experience-header-row">
                  <h6>{exp.name}, {exp.age}</h6>
                  <p className="year">{exp.year}</p>
                </div>
                <p className="experience-text subtitle">"{truncateText(exp.experience, 150)}"</p>
                <span className="read-more">Read More</span>
              </div>
            </div>
          ))}
        </div>

        <Link to="/all-experiences" className="view-all"><p className="subtitle">View All Stories</p></Link>
      </div>

      {selectedExperience && (
        <>
          <div className="gallery-modal-overlay" onClick={() => setSelectedExperience(null)}></div>
          <div className="expanded-experience-modal" ref={modalRef}>
            <button className="close-btn" onClick={() => setSelectedExperience(null)}><h6>×</h6></button>
            <img src={selectedExperience.image} alt={selectedExperience.name} className="expanded-image" />
            <div className="expanded-content">
              <h6>{selectedExperience.name}, {selectedExperience.age}</h6>
              <p className="year">{selectedExperience.year}</p>
              <p className="subtitle">{selectedExperience.experience}</p>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default ExperiencesSection;
