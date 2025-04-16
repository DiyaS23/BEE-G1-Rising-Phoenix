import React from 'react';
import './Hero.css'; // Import the CSS file for styling
const scrollToMovies = () => {
  const section = document.getElementById("all-movies");
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

function Hero() {
  return (
    <div className="hero-section">
      <div className="hero-overlay">
        <h1 className="hero-title">Welcome to MovieVerse</h1>
        <p className="hero-tagline">Your ultimate movie Universe</p>
        <button className="cta-button" onClick={scrollToMovies}>Explore Movies</button>
      </div>
    </div>
  );
}

export default Hero;
