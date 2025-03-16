import React, { useState, useEffect } from "react";
import "../styles/ImpactStories.css";
import impactStories from "../data/impact.json";

const ImpactStories = () => {

    const [heading, setHeading] = useState("See how our Volunteers change lives — one story at a time!");
        
          useEffect(() => {
            const updateHeading = () => {
              if (window.innerWidth <= 600) {
                setHeading("Stories of Impact made by our Volunteers!");
              } else {
                setHeading("See how our Volunteers change lives — one story at a time!");
              }
            };
        
            // Run on mount
            updateHeading();
        
            // Listen for window resize
            window.addEventListener("resize", updateHeading);
        
            return () => window.removeEventListener("resize", updateHeading);
          }, []);

    const [selectedStory, setSelectedStory] = useState(null);

    // Close modal when clicking outside (overlay)
    const handleCloseModal = () => setSelectedStory(null);

    return (
        <section className="impact-section">
            <h4 className="impact-heading">{heading}</h4>
            <div className="impact-body">
                <p>*All the children have their names and other identifying features hidden to comply with Child Protection Policy</p>
                {/* Bento Grid Layout */}
                <div className="impact-bento-grid">
                    <div className="impact-bento-item" onClick={() => setSelectedStory(impactStories[0])}>
                        <img src={impactStories[0].image} alt={impactStories[0].name} className="student-image student-image-1" />
                        <h6 className="story-heading story-heading-1">{impactStories[0].name}</h6>
                    </div>

                    <div className="impact-bento-item" onClick={() => setSelectedStory(impactStories[1])}>
                        <img src={impactStories[1].image} alt={impactStories[1].name} className="student-image student-image-2" />
                        <h6 className="story-heading story-heading-2">{impactStories[1].name}</h6>
                    </div>

                    <div className="impact-bento-item" onClick={() => setSelectedStory(impactStories[2])}>
                        <img src={impactStories[2].image} alt={impactStories[2].name} className="student-image student-image-3" />
                        <h6 className="story-heading story-heading-3">{impactStories[2].name}</h6>
                    </div>

                    <div className="impact-bento-item" onClick={() => setSelectedStory(impactStories[3])}>
                        <img src={impactStories[3].image} alt={impactStories[3].name} className="student-image student-image-4" />
                        <h6 className="story-heading story-heading-4">{impactStories[3].name}</h6>
                    </div>

                    <div className="impact-bento-item" onClick={() => setSelectedStory(impactStories[4])}>
                        <img src={impactStories[4].image} alt={impactStories[4].name} className="student-image student-image-5" />
                        <h6 className="story-heading story-heading-5">{impactStories[4].name}</h6>
                    </div>
                    <div className="impact-bento-item" onClick={() => setSelectedStory(impactStories[5])}>
                        <img src={impactStories[5].image} alt={impactStories[5].name} className="student-image student-image-6" />
                        <h6 className="story-heading story-heading-6">{impactStories[5].name}</h6>
                    </div>
                </div>
            </div>


            {/* Modal */}
            {selectedStory && (
                <>
                    <div className="modal-overlay show" onClick={handleCloseModal}></div>
                    <div className="expanded-story-modal show">
                        <button className="close-btn" onClick={handleCloseModal}><h6>×</h6></button>
                        <img src={selectedStory.image} alt={selectedStory.name} className="expanded-image-impact" />
                        <div className="expanded-content">
                            <h4>{selectedStory.name}</h4><br />
                            <p className="year">Volunteer: {selectedStory.volunteer}, {selectedStory.year}</p>
                            <p className="subtitle">{selectedStory.story}</p>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
};

export default ImpactStories;
