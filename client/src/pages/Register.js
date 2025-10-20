// src/pages/Register.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import axios from 'axios';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import './AuthForm.css';
import AuthLayout from '../components/AuthLayout'; // <-- Import the new layout
import api from '../utils/api';

const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // 2. Use 'api' and only provide the endpoint
      await api.post('/auth/register', { name, email, password }); 
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'An error occurred.');
    }
};

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  const { name, email, password } = formData;
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://final-returns-sbl-project.vercel.app/register', { name, email, password });
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'An error occurred.');
    }
  };

  return (
    <AuthLayout> {/* <-- Use the layout component */}
      <div className="auth-box">
        <Link to="/" className="back-to-home">← Back to Home</Link>
        <h2>Create Account</h2>
        <form onSubmit={onSubmit}>
          {/* Form content remains the same */}
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={name} onChange={onChange} required className="form-input"/>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={email} onChange={onChange} required className="form-input"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={password} onChange={onChange} required className="form-input"/>
            <PasswordStrengthMeter password={password} />
          </div>
          <button type="submit" className="auth-button">Register</button>
        </form>
      </div>
    </AuthLayout>
  );
};
export default Register;