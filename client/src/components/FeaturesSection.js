// src/components/FeaturesSection.js
import React from 'react';
import './FeaturesSection.css';

const FeaturesSection = () => {
  return (
    <div className="features-section" id="tracker">
      <h2>Track Sessions Effortlessly</h2>
      <p>ProTrack lets you time your study, work, or habits with ease — all in one minimalist dashboard.</p>
      <div className="features-cards">
        <div className="card">
          <h3>Pomodoro Timer</h3>
        </div>
        <div className="card">
          <h3>Task Tracker</h3>
        </div>
        <div className="card">
          <h3>Daily Insights</h3>
        </div>
      </div>
      <a href="#contact" className="btn-touch">Get in Touch</a>
    </div>
  );
};

export default FeaturesSection;