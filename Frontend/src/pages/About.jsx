import React from 'react';
import '../styles/about.css'

const About = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About Us</h1>
        <p className="subheading">Your trusted partner for seamless travel experiences</p>
      </header>

      <section className="about-section">
        <p className="highlight-text">
          We believe that travel is not just about reaching a destination; it’s about experiencing the journey with ease and comfort. Our team is dedicated to making your travel experience memorable and hassle-free by handling all the details, so you can focus on what truly matters.
        </p>
      </section>

      <div className="about-section">
        <h2 className="section-title">Why Choose Us</h2>
        <ul className="centered-list">
          <li><span className="icon">&#10003;</span> Expert Travel Planners</li>
          <li><span className="icon">&#10003;</span> Personalized Itineraries</li>
          <li><span className="icon">&#10003;</span> 24/7 Customer Support</li>
          <li><span className="icon">&#10003;</span> Exclusive Deals & Discounts</li>
        </ul>
      </div>
    </div>
  );
};

export default About;


