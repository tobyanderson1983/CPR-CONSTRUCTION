// CustomerDashboard

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

const CustomerDashboard = () => {
  const [services, setServices] = useState([]);
  const token = localStorage.getItem('token');
  const location = useLocation();
  const navigate = useNavigate(); // Redirect users if needed
  const userName = `${location.state?.firstName || "Guest"} ${location.state?.lastName || ""}`.trim();

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        console.warn("No token found, redirecting to login...");
        navigate("/login"); // Redirect to login page if token is missing
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/auth/customer', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setServices(response.data.services);
      } catch (error) {
        console.error("Error fetching services:", error.response?.data || error.message);
      }
    };

    fetchData();
  }, [token, navigate]);

  return (
    <div>
      <h2>Welcome, {userName}!</h2>
      <h3>Your Service Requests:</h3>
      {services.length === 0 ? (
        <p>No service requests found.</p>
      ) : (
        <ul>
          {services.map((service, index) => (
            <li key={index}>
              <strong>Service:</strong> {service.serviceType} <br />
              <strong>Status:</strong> {service.status} <br />
              <strong>Date Requested:</strong> {new Date(service.dateRequested).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomerDashboard;

