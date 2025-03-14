import React, { useState } from "react";
import "../styles/Gallery.css";
import images from "../data/gallery.json";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="gallery-container">
      <h2 className="gallery-heading">Follow the story, one photo at a time!</h2>

      {/* Carousel with infinite scrolling */}
      <div className="gallery-carousel">
        <div className="gallery-carousel-track">
          {/* Duplicate images for smooth infinite scrolling */}
          {[...images, ...images].map((img, index) => (
            <div key={index} className="gallery-carousel-item" onClick={() => setSelectedImage(img)}>
              {index % 2 === 0 ? (
                <>
                  <img src={img.src} alt={img.caption} className="gallery-carousel-image" />
                  <div className="gallery-timeline-line"></div>
                  <p className="gallery-carousel-caption">{img.caption}</p>
                  <p className="gallery-carousel-date">{img.date}</p>
                </>
              ) : (
                <>
                  <p className="gallery-carousel-caption">{img.caption}</p>
                  <p className="gallery-carousel-date">{img.date}</p>
                  <div className="gallery-timeline-line"></div>
                  <img src={img.src} alt={img.caption} className="gallery-carousel-image" />
                </>
              )}
            </div>

          ))}
        </div>
      </div>

      {/* Modal for Enlarged Image */}
      {selectedImage && (
        <>
          <div className="gallery-modal-overlay" onClick={() => setSelectedImage(null)}></div>
          <div className="gallery-modal-content">
            <button className="gallery-close-btn" onClick={() => setSelectedImage(null)}>×</button>
            <img src={selectedImage.src} alt="Enlarged View" className="gallery-modal-image" />
            <p className="gallery-modal-caption">{selectedImage.caption}</p>
            <p className="gallery-modal-date">{selectedImage.date}</p>
          </div>
        </>
      )}
    </section>
  );
};

export default Gallery;
