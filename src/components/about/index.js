// AboutPage.js

import React from "react";
import Header from "../header";
import "./about.css";

const AboutPage = () => {
  return (
    <div>
      <Header />
      <div className="about-page">
        <h2>About Us</h2>
        <section className="project-info">
          <h3>Project Description</h3>
          <p>
            Insert relevant information about the project here. Describe the
            purpose, goals, and any other details that are important for
            visitors to know.
          </p>
        </section>
        <section className="team-info">
          <h3>Our Team</h3>
          <div className="team-member">
            <h4>Mohammad Khaleelur Rahman</h4>
          </div>
          <div className="team-member">
            <h4>Marri Aniketh Reddy</h4>
          </div>
          <div className="team-member">
            <h4>Nagaraju Lalitha</h4>
          </div>
          <div className="team-member">
            <h4>Manthapuram Charwak</h4>
          </div>
          <div className="team-member">
            <h4>Kyahtam Satheesh</h4>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
