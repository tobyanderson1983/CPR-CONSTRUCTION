

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/LogIn.css";

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });
     
      const { token, username: user, role, firstName, lastName } = res.data;

      // ✅ Save token & role in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      

      // ✅ Navigate based on role
      if (role === "admin") {
        navigate("/adminDashboard", { state: { firstName, lastName } });
      } else if (role === "employee") {
        navigate("/employeeDashboard", { state: { firstName, lastName } });
      } else if (role === 'service') {
      //   navigate('/serviceDashboard', { state: { username } });
      }else if(role === 'customer'){
        navigate("/customerDashboard", { state: { firstName, lastName } });
      } else {
        console.error("Unexpected role received:", role);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div >
        {/* Use <form> and handle submit via onSubmit */}
        <form onSubmit={login} className="login-box">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && login(e)} // Handle Enter key press
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && login(e)} // Handle Enter key press
          />

          <button type="submit">Log In</button>
        </form>

        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default LogIn;
