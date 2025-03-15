import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import "../styles/About.css";
import aboutData from "../data/about.json"; // Import JSON directly

const About = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  return (
    <section className="about" ref={ref}>
      <div className="about-container">
        {/* Heading */}
        <h4 className="about-heading">What is {aboutData["Center Name"]}?</h4>

        {/* Description */}
        <p className="about-text">
          {aboutData["About U&I"]}
          <br /><br />
          {aboutData["About the center"]}
        </p>
      </div>

      {/* Statistics Section */}
      <div className="stats-container">
        <div className="stat">
          <h3>{inView && <CountUp start={0} end={aboutData["Number of Volunteers"]} duration={2} />}+</h3>
          <p>Teacher-Volunteers</p>
        </div>
        <div className="stat">
          <h3>{inView && <CountUp start={0} end={aboutData["Number of Students"]} duration={2} />}+</h3>
          <p>Children taught</p>
        </div>
        <div className="stat">
          <h3>{inView && <CountUp start={0} end={aboutData["Number of Hours Taught"]} duration={2} />}+</h3>
          <p>Hours of Teaching</p>
        </div>
      </div>
    </section>
  );
};

export default About;
