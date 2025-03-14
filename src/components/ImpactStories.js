import React, { useState } from "react";
import "../styles/ImpactStories.css";
import impactStories from "../data/impact.json";

const ImpactStories = () => {
    const [selectedStory, setSelectedStory] = useState(null);

    // Close modal when clicking outside (overlay)
    const handleCloseModal = () => setSelectedStory(null);

    return (
        <section className="impact-section">
            <h2 className="impact-heading">See how our Volunteers change lives — one story at a time!</h2>

            {/* Bento Grid Layout */}
            <div className="impact-bento-grid">
                <div className="impact-bento-item" onClick={() => setSelectedStory(impactStories[0])}>
                    <img src={impactStories[0].image} alt={impactStories[0].name} className="student-image student-image-1" />
                    <h3 className="story-heading story-heading-1">{impactStories[0].name}</h3>
                </div>

                <div className="impact-bento-item" onClick={() => setSelectedStory(impactStories[1])}>
                    <img src={impactStories[1].image} alt={impactStories[1].name} className="student-image student-image-2" />
                    <h3 className="story-heading story-heading-2">{impactStories[1].name}</h3>
                </div>

                <div className="impact-bento-item" onClick={() => setSelectedStory(impactStories[2])}>
                    <img src={impactStories[2].image} alt={impactStories[2].name} className="student-image student-image-3" />
                    <h3 className="story-heading story-heading-3">{impactStories[2].name}</h3>
                </div>

                <div className="impact-bento-item" onClick={() => setSelectedStory(impactStories[3])}>
                    <img src={impactStories[3].image} alt={impactStories[3].name} className="student-image student-image-4" />
                    <h3 className="story-heading story-heading-4">{impactStories[3].name}</h3>
                </div>

                <div className="impact-bento-item" onClick={() => setSelectedStory(impactStories[4])}>
                    <img src={impactStories[4].image} alt={impactStories[4].name} className="student-image student-image-5" />
                    <h3 className="story-heading story-heading-5">{impactStories[4].name}</h3>
                </div>
            </div>


            {/* Modal */}
            {selectedStory && (
                <>
                    <div className="modal-overlay show" onClick={handleCloseModal}></div>
                    <div className="expanded-story-modal show">
                        <button className="close-btn" onClick={handleCloseModal}>×</button>
                        <img src={selectedStory.image} alt={selectedStory.name} className="expanded-image-impact" />
                        <div className="expanded-content">
                            <h3>{selectedStory.name}</h3><br/>
                            <p className="year">Volunteer: {selectedStory.volunteer}, {selectedStory.year}</p>
                            <p>{selectedStory.story}</p>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
};

export default ImpactStories;
