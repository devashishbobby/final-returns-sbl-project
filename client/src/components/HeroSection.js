// src/components/HeroSection.js
import React from 'react';
import './HeroSection.css';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className='hero-container' id="home">
      {/* The invalid file path has been removed from here. */}
      
      <video 
        /* THIS IS THE CORRECT PATH */
        src="/videos/stock.mp4" 
        autoPlay
        loop
        muted
        className="hero-video"
      />
      
      {/* The rest of your hero content remains the same */}
      <h1>Your Calm Space to Track Progress</h1>
      <p>Stay focused. Build habits. Grow slowly, but surely.</p>
      <div className='hero-btns'>
        <Link to="/login" className='btn btn--outline'>
          Continue with Email
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;