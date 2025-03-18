import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/ExperiencesCarousel.css";
import experiences from "../data/experiences.json";
import videos from "../data/videos.json";

const ExperiencesSection = () => {
  const [heading, setHeading] = useState(
    "Ready to explore? Hear from the Teachers themselves!"
  );
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [randomExperiences, setRandomExperiences] = useState([]);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const isManuallyPausedRef = useRef(true);
  const modalRef = useRef(null);
  const videoRef = useRef(null);
  const touchStartX = useRef(0);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      video.pause();
      video.src = videos[selectedVideoIndex].video;

      video.onloadeddata = () => {
        if (!isManuallyPausedRef.current) {
          video.play().catch((err) => console.warn("Autoplay blocked:", err));
        }
      };

      video.onplay = () => (isManuallyPausedRef.current = false);
      video.onpause = () => (isManuallyPausedRef.current = true);
    }
  }, [selectedVideoIndex]);

  useEffect(() => {
    const preventAutoplay = () => {
      if (videoRef.current) videoRef.current.pause();
    };

    document.addEventListener("visibilitychange", preventAutoplay);
    document.addEventListener("focus", preventAutoplay);
    document.addEventListener("click", preventAutoplay);

    return () => {
      document.removeEventListener("visibilitychange", preventAutoplay);
      document.removeEventListener("focus", preventAutoplay);
      document.removeEventListener("click", preventAutoplay);
    };
  }, []);

  useEffect(() => {
    const updateHeading = () => {
      setHeading(
        window.innerWidth <= 600
          ? "Our Teachers, Their Stories!"
          : "Ready to explore? Hear from the Teachers themselves!"
      );
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
    const enableVideoInteraction = () => {
      isManuallyPausedRef.current = false;
      document.removeEventListener("click", enableVideoInteraction);
    };

    document.addEventListener("click", enableVideoInteraction);
    return () => document.removeEventListener("click", enableVideoInteraction);
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedExperience]);

  const truncateText = (text, charLimit) =>
    text.length > charLimit ? text.substring(0, charLimit) + "..." : text;

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      const video = videoRef.current;

      if (video.paused) {
        video.play();
        isManuallyPausedRef.current = false;
      } else {
        video.pause();
        isManuallyPausedRef.current = true;
      }
    }
  };


  const changeVideo = (direction) => {
    setSelectedVideoIndex((prevIndex) => {
      let newIndex = prevIndex + direction;
      if (newIndex < 0) newIndex = videos.length - 1;
      if (newIndex >= videos.length) newIndex = 0;
      return newIndex;
    });

    isManuallyPausedRef.current = true;
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartX.current - touchEndX;

    if (Math.abs(deltaX) > 50) {
      changeVideo(deltaX > 0 ? 1 : -1);
    }
  };

  return (
    <section className="experiences-section experiences">
      <div className="headingAndCards">
        <div className="experience-header">
          <h4 className="experience-heading">{heading}</h4>
        </div>

        <div className="experience-grid">
          {randomExperiences.map((exp, index) => (
            <div
              key={index}
              className="experience-card"
              onClick={() => setSelectedExperience(exp)}
            >
              <img
                src={exp.image}
                alt={exp.name}
                className="volunteer-image-full"
                loading="lazy"
              />
              <div className="experience-content">
                <div className="experience-header-row">
                  <h6>
                    {exp.name}, {exp.age}
                  </h6>
                  <p className="year">{exp.year}</p>
                </div>
                <p className="experience-text subtitle">
                  "{truncateText(exp.experience, 150)}"
                </p>
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
        <img
          src="/assets/Videos/arrow.png"
          alt="Arrow pointing to videos"
          className="arrow-image"
        />

        <div className="video-carousel-container">
          <div className="video-title-overlay">
            <p>{videos[selectedVideoIndex].title}</p>
          </div>

          <div
            className="video-container"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onClick={toggleVideoPlay}
          >
            <button className="carousel-btn left" onClick={() => changeVideo(-1)}>
              ❮
            </button>
            <video
              ref={videoRef}
              className="video-item"
              controls
              muted
              controlsList="nodownload"
              onTouchEnd={toggleVideoPlay}
              autoPlay={false}
            >
              <source src={videos[selectedVideoIndex].video} type="video/mp4" />
            </video>

            <button className="carousel-btn right" onClick={() => changeVideo(1)}>
              ❯
            </button>
          </div>
        </div>
      </div>

      {selectedExperience && (
        <>
          <div
            className="gallery-modal-overlay"
            onClick={() => setSelectedExperience(null)}
          ></div>
          <div className="expanded-experience-modal" ref={modalRef}>
            <button className="close-btn" onClick={() => setSelectedExperience(null)}>
              <h6>×</h6>
            </button>
            <img
              src={selectedExperience.image}
              alt={selectedExperience.name}
              className="expanded-image"
            />
            <div className="expanded-content">
              <h6>
                {selectedExperience.name}, {selectedExperience.age}
              </h6>
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
