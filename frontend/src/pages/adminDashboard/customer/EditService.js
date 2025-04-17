// EditService.js

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditService = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { service } = location.state;

  const [formData, setFormData] = useState({
    serviceType: service.serviceType || '',
    description: service.description || '',
    status: service.status || '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/customers/services/${service._id}`, formData);
      alert('Service updated successfully!');
      navigate('/adminDashboard', { state: { updated: true } });
    } catch (error) {
      console.error('Error updating service:', error);
      alert('Failed to update service.');
    }
  };

  return (
    <div className="edit-service-form">
      <h2>Edit Service Request for {service.firstName} {service.lastName}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="serviceType"
          value={formData.serviceType}
          onChange={handleChange}
          placeholder="Service Type"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Work Description"
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit">Update</button>
        <button type="button" onClick={() => navigate(-1)}>Cancel</button>
      </form>
    </div>
  );
};

export default EditService;
