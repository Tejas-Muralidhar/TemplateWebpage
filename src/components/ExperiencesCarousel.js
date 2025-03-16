import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/ExperiencesCarousel.css";
import experiences from "../data/experiences.json";
import videos from "../data/videos.json";

const ExperiencesSection = () => {
  const [heading, setHeading] = useState("Ready to explore? Hear from the Teacher's themselves!");
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [randomExperiences, setRandomExperiences] = useState([]);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const modalRef = useRef(null);
  const videoRef = useRef(null); // Reference to the video element

  useEffect(() => {
    const updateHeading = () => {
      setHeading(window.innerWidth <= 600 ? "Our Teachers, Their Stories!" : "Ready to explore? Hear from the Teacher's themselves!");
    };

    updateHeading();
    window.addEventListener("resize", updateHeading);
    return () => window.removeEventListener("resize", updateHeading);
  }, []);

  useEffect(() => {
    const shuffled = [...experiences].sort(() => 0.5 - Math.random());
    setRandomExperiences(shuffled.slice(0, 3));
  }, []);

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

  const truncateText = (text, charLimit) => text.length > charLimit ? text.substring(0, charLimit) + "..." : text;

  // Change the displayed video by updating key instead of src
  const changeVideo = (direction) => {
    setSelectedVideoIndex((prevIndex) => {
      let newIndex = prevIndex + direction;
      if (newIndex < 0) newIndex = videos.length - 1; // Loop back to last video
      if (newIndex >= videos.length) newIndex = 0; // Loop back to first video
  
      // Ensure the video updates by reloading it
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.load(); // Reload the video source
          videoRef.current.play(); // Auto-play after change (optional)
        }
      }, 100); // Small delay to ensure state updates
  
      return newIndex;
    });
  };

  return (
    <section className="experiences-section experiences">
      <div className="headingAndCards">
        <div className="experience-header">
          <h4 className="experience-heading">{heading}</h4>
        </div>

        <div className="experience-grid">
          {randomExperiences.map((exp, index) => (
            <div key={index} className="experience-card" onClick={() => setSelectedExperience(exp)}>
              <img src={exp.image} alt={exp.name} className="volunteer-image-full" loading="lazy" />
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

        <Link to="/all-experiences" className="view-all">
          <p className="subtitle">View All Stories</p>
        </Link>

        {/* Video Section */}
        <h6 className="watch-text">Not a fan of reading? Then see it in action!</h6>
        <img src="/assets/Videos/arrow.png" alt="Arrow pointing to videos" className="arrow-image" />

        <div className="video-carousel-container">
          <div className="video-title-overlay"><p>{videos[selectedVideoIndex].title}</p></div> {/* ✅ Moved Above */}

          <div className="video-container">
            <button className="carousel-btn left" onClick={() => changeVideo(-1)}>❮</button>

            <video
              ref={videoRef}
              controls
              className="video-item"
              disablePictureInPicture
              controlsList="nofullscreen nodownload"
              onClick={() => {
                if (videoRef.current.paused) {
                  videoRef.current.play();
                } else {
                  videoRef.current.pause();
                }
              }}
            >
              <source src={videos[selectedVideoIndex].video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <button className="carousel-btn right" onClick={() => changeVideo(1)}>❯</button>
          </div>
        </div>

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
