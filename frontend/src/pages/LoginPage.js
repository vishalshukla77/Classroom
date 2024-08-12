// src/components/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://classroombackend-2kdy.onrender.com/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      if (response.data.user.role === 'Teacher') {
        navigate('/teacherdashboard');
      } else if (response.data.user.role === 'Student') {
        navigate('/studentdashboard');
      } else if (response.data.user.role === 'Principal') {
        navigate('/principaldashboard');
      }
    } catch (error) {
      alert('Login failed! Please check your credentials.');
    }
  };

  return (
    <div className="container my-5">
      <h2>User Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Email address</label>
          <input 
            type="email" 
            className="form-control" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input 
            type="password" 
            className="form-control" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
