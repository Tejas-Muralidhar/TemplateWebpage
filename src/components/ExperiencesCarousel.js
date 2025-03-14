import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/ExperiencesCarousel.css";

// Sample experience data
import experiences from "../data/experiences.json";


const ExperiencesSection = () => {
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

  // Function to truncate text
  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
  };

  return (
    <section className="experiences-section experiences">
      <div className="headingAndCards">
      <div className="experience-header">
        <h2 className="experience-heading">Ready to explore? Read through these amazing volunteer stories!</h2>
      </div>

      <div className="experience-grid">
        {randomExperiences.map((exp, index) => (
          <div key={index} className="experience-card" onClick={() => setSelectedExperience(exp)}>
            <img src={exp.image} alt={exp.name} className="volunteer-image-full" />
            <div className="experience-content">
              <div className="experience-header-row">
                <h3>{exp.name}, {exp.age}</h3>
                <p className="year">{exp.year}</p>
              </div>
              <p className="experience-text">"{truncateText(exp.experience, 50)}"</p>
              <span className="read-more">Read More</span>
            </div>
          </div>
        ))}
      </div>
      <Link to="/all-experiences" className="view-all">
      View All Stories
      </Link>
      </div>

      {selectedExperience && (
        <>
          <div className="gallery-modal-overlay" onClick={() => setSelectedExperience(null)}></div>
          <div className="expanded-experience-modal" ref={modalRef}>
            <button className="close-btn" onClick={() => setSelectedExperience(null)}>×</button>
            <img src={selectedExperience.image} alt={selectedExperience.name} className="expanded-image" />
            <div className="expanded-content">
              <h3>{selectedExperience.name}, {selectedExperience.age}</h3>
              <p className="year">{selectedExperience.year}</p>
              <p>{selectedExperience.experience}</p>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default ExperiencesSection;
