// src/components/AuthLayout.js
import React from 'react';
import './AuthLayout.css'; // We'll create this next

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-layout-container">
      <video
        src="/videos/stock.mp4" // Assuming the same background video
        autoPlay
        loop
        muted
        className="auth-video-bg"
      />
      {children} {/* This is where the Login or Register form will appear */}
    </div>
  );
};

export default AuthLayout;