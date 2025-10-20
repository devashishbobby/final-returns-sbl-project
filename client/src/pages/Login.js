// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import axios from 'axios';
import './AuthForm.css';
import AuthLayout from '../components/AuthLayout'; // <-- Import the new layout
import api from '../utils/api';


const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // 2. Use 'api' and only provide the endpoint
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'An error occurred.');
    }
};

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { email, password } = formData;
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://final-returns-sbl-project.vercel.app/login', { email, password });
localStorage.setItem('token', res.data.token);
console.log('--- TOKEN SAVED ---', res.data.token); // <-- ADD THIS LINE
navigate('/dashboard');
    } catch (err) {
        alert(err.response?.data?.message || 'An error occurred.');
    }
  };

  return (
    <AuthLayout> {/* <-- Use the layout component */}
      <div className="auth-box">
        <Link to="/" className="back-to-home">← Back to Home</Link>
        <h2>Login</h2>
        <form onSubmit={onSubmit}>
          {/* Form content remains the same */}
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={email} onChange={onChange} required className="form-input"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={password} onChange={onChange} required className="form-input"/>
          </div>
          <button type="submit" className="auth-button">Login</button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;