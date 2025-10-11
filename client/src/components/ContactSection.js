// client/src/components/ContactSection.js

import React, { useState } from 'react';
import axios from 'axios';
import './ContactSection.css';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [statusMessage, setStatusMessage] = useState('');

  const { name, email, message } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage('Sending...');

    try {
      const body = { name, email, message };
      const res = await axios.post('http://localhost:5001/api/contact', body);
      setStatusMessage(res.data.msg);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Contact form submission error:', err);
      setStatusMessage('Sorry, something went wrong. Please try again.');
    }
  };

  return (
    // Your original outer div had different styling, let's match your CSS file
    <section id="contact" className="contact-section">
      <h2>Contact Us</h2>
      <form className="contact-form" onSubmit={onSubmit}>
        {/* --- THIS DIV IS THE KEY TO FIXING THE LAYOUT --- */}
        <div className="form-row">
          <input
            type="text"
            placeholder="Your Name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <textarea
          placeholder="Your Message"
          name="message"
          value={message}
          onChange={onChange}
          required
        ></textarea>
        {/* --- Ensure the button class matches your CSS --- */}
        <button type="submit" className="btn-send">
          Send Message
        </button>
      </form>
      {statusMessage && <p className="status-message">{statusMessage}</p>}
    </section>
  );
};

export default ContactSection;