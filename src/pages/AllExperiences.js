import { useNavigate } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/AllExperiences.css";
import experiences from "../data/experiences.json";

const AllExperiences = () => {
  const navigate = useNavigate();
  const [selectedExperience, setSelectedExperience] = useState(null);
  const modalRef = useRef(null);

  // Scroll to top when the component is mounted
  useEffect(() => {
    window.scrollTo(0, 0); // This will scroll the page to the top
  }, []);

  // Close modal when clicking outside
  React.useEffect(() => {
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
    <section className="all-experiences-section all-experiences">
      <div className="headingAndCards">
        <div className="all-experience-header">
          <h2 className="all-experience-heading">
            See the journey every single one of our volunteers took!
          </h2>
        </div>

        <div className="all-experience-grid">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="all-experience-card"
              onClick={() => setSelectedExperience(exp)}
            >
              <img src={exp.image} alt={exp.name} className="volunteer-image-full" />
              <div className="all-experience-content">
                <div className="all-experience-header-row">
                  <h3>
                    {exp.name}, {exp.age}
                  </h3>
                  <p className="year">{exp.year}</p>
                </div>
                <p className="all-experience-text">
                  "{truncateText(exp.experience, 50)}"
                </p>
                <span className="read-more">Read More</span>
              </div>
            </div>
          ))}
        </div>
        {/* Back Button */}
        <a className="back-button" onClick={() => navigate(-1)}>
          Back
        </a>
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

export default AllExperiences;
