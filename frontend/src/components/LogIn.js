// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './css/LogIn.css';

// const LogIn = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate(); 


//   const login = () => {
//     axios.post('http://localhost:5000/api/auth/login', { username, password })
//       .then(res => {
//         const { token, username, role } = res.data;
  
//         // Save the token in local storage
//         localStorage.setItem('token', token);
  
//         console.log('Login successful', res.data);
//         console.log(role);
  
//         // Navigate based on role
//         if (role === 'admin') {
//           navigate('/adminDashboard', { state: { username } });
//         } else if (role === 'employee') {
//           // alert('employee success');
//           navigate('/employeeDashboard', { state: { username } });
//         // } else if (role === 'service') {
//         //   navigate('/serviceDashboard', { state: { username } });
//         } else {
//           console.error("Unexpected role received:", role);
//         }
//       })
//       .catch(error => {
//         console.error("Login error:", error);
//         setError("Invalid credentials. Please try again.");
//       });
//   };
  
//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
        
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
        
//         <button onClick={login}>Log In</button>

//         {error && <p className="error-message">{error}</p>}
//       </div>
//     </div>
//   );
// };

// export default LogIn;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/LogIn.css";

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { username, password });
      const { token, username: user, role, firstName, lastName } = res.data;
      console.log(user);
      console.log(firstName)
      console.log(lastName)

      // ✅ Save token & role in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      console.log("Login successful", res.data);

      // ✅ Navigate based on role
      if (role === "admin") {
        navigate("/adminDashboard", { state: { firstName, lastName } });
      } else if (role === "employee") {
        navigate("/employeeDashboard", { state: { firstName, lastName } });
      } else if (role === 'service') {
      //   navigate('/serviceDashboard', { state: { username } });
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
