import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Link } from "react-scroll"; // ✅ Import Link here
import "swiper/css";
import "swiper/css/autoplay";
import "../styles/Home.css";

// Import images
import images from "../data/home.json";

const Home = () => {
  return (
    <section className="home">
      {/* Swiper Carousel */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="carousel-container"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img.image} alt={`Slide ${index + 1}`} className="carousel-image" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Volunteer Button */}
      <div className="volunteer-btn-container">
        <button className="volunteer-btn">
          <Link to="gallery-container" smooth={true} duration={500} offset={-100} className="scroll">
            See what we do
          </Link>
        </button>
      </div>
    </section>
  );
};

export default Home;
