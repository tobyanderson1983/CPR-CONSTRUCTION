import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  // Login function
  const login = () => {
    console.log('login triggered');
    axios.post('http://localhost:5000/api/auth/login', { username, password })
      .then(res => {
        console.log('login second trigger');
        localStorage.setItem('token', res.data.token);
        console.log('Login successful', res.data); // Debugging: Check response structure
  
        // Ensure res.data.username is a string before navigating
        if (typeof res.data.username === 'string') {
          console.log('string');
          navigate('/dashboard', { state: { username: res.data.username } });
        } else {
          console.error("Expected username to be a string, but got:", res.data.username);
        }
      })
      .catch(error => {
        console.error("Login error:", error);
        setError("Invalid credentials. Please try again.");
      });
  };

  return (
    <div>
      <h2>Login</h2>
      
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
      
      <button onClick={login}>Log In</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LogIn;
