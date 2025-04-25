

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Services from '../pages/basicPages/ScheduleServices.js';
import "./css/LogIn.css";

const LogIn = ({ view, setView }) => {

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

      // ✅ Save token, role, and full user object
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      // localStorage.setItem("user", JSON.stringify({ username: user, role, firstName, lastName }));
      localStorage.setItem("adminName", JSON.stringify({ firstName, lastName }));



      // ✅ Navigate based on role
      if (role === "admin") {
        localStorage.setItem("adminName", JSON.stringify({ firstName, lastName }));
        navigate("/adminDashboard", { state: { firstName, lastName } });
      } else if (role === "employee") {
        // localStorage.setItem('employeeName', JSON.stringify({ firstName, lastName }));
        navigate("/employeeDashboard", { state: { firstName, lastName } });
      }else if(role === 'customer'){
        // localStorage.setItem('customerName', JSON.stringify({ firstName, lastName }));
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
    <>
      {view === null && (
        <div className="login-container">
          <div>
            <form onSubmit={login} className="login-box">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && login(e)} 
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && login(e)} 
              />

              <button type="submit">Log In</button>

              <p>OR</p>

              <button type="button" id='new-customer-cancel-button' onClick={() => setView('scheduleServices')}>
                New Customer
              </button>
            </form>

            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      )}

      {view === 'scheduleServices' && (
        <div>
          <Services />
          <div className="cancel-button-wrapper">
            <button type="button" onClick={() => setView(null)}>
              Cancel / Back to Login
            </button>
          </div>

        </div>
      )}
    </>
  );

}


export default LogIn;
