//Services.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Track whether it's Login or Register form
  const navigate = useNavigate(); 

  // Login function
  const login = (userName, passWord) => {
    axios.post('http://localhost:5000/api/auth/login', { username, password })
      .then(res => {
        localStorage.setItem('token', res.data.token);
        console.log('login');
        console.log(`name is: ${res.data.username}`);
        navigate('/dashboard', {state: res.data.username}); // Redirect to Dashboard after login
      })
      .catch(error => console.error("Login error:", error))
  };

  // Register function
  const register = () => {

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    axios.post('http://localhost:5000/api/auth/register', { username, password })
    .then(res => {
      login(username, password);
    })
    .catch(error => console.error("Registration error:", error));
  };

  return (
    <div>
      <h2>{isLogin ? 'Login' : 'Create a New Profile'}</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {!isLogin && (
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      )}
      <button onClick={isLogin ? login : register}>
        {isLogin ? 'Log In' : 'Register'}
      </button>

      <p>
        {isLogin ? "Don't have an account?" : 'Already have an account?'}
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Create one here' : 'Login here'}
        </button>
      </p>

      {error && <p>{error}</p>}
    </div>
  );
};

export default Services;
