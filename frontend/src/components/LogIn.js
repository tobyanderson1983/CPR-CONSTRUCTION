import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/LogIn.css';

const LogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const login = () => {
    axios.post('http://localhost:5000/api/auth/login', { username, password })
      .then(res => {
        localStorage.setItem('token', res.data.token);
        console.log('Login successful', res.data);
  
        if (typeof res.data.username === 'string') {
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
    <div className="login-container">
      <div className="login-box">
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

        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default LogIn;
