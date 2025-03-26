//AdminDashboard.js

import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';

const AdminDashboard = () => {
  const [services, setServices] = useState([]);
  const token = localStorage.getItem('token');
  const location = useLocation();
  //const userData = location.state;
  const userName = location.state?.username || "Guest";

  //console.log(userName);
  console.log(location.state.username)


  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:5000/api/auth/adminDashboard', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(response.data.services);
    };
    fetchData();
  }, [token]);

  return (
    <div>
      <h2>Welcome {userName}</h2>
      <h3>Your Service Requests:</h3>
      <ul>
        {services.map((service, index) => (
          <li key={index}>
            {service.name} - {service.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
