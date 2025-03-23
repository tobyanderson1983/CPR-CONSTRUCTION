import React, { useState } from 'react';
import axios from 'axios';

const Services = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    streetAddress: '',
    city: '',
    state: 'WA', // Default state
    zipCode: '',
    phoneNumber: '',
    email: '',
    serviceType: 'Roofing', // Default service
    description: '',
  });

  const usStates = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
  ];

  const serviceTypes = ["Roofing", "Remodel", "Deck", "Fence", "Other"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form:", formData);
  
    try {
      const res = await axios.post('http://localhost:5000/api/auth/services', formData);
      
      console.log('Response from server:', res.data);
  
      // Show a success message
      alert('Service request submitted successfully!');
  
      // Clear the form after submission
      setFormData({
        firstName: '',
        lastName: '',
        streetAddress: '',
        city: '',
        state: 'WA',
        zipCode: '',
        phoneNumber: '',
        email: '',
        serviceType: 'Roofing',
        description: '',
      });
  
    } catch (err) {
      console.error('Error submitting service request:', err.response?.data || err.message);
      alert('Error submitting service request. Please try again.');
    }
  };
  

  return (
    <div>
      <h1>Request a Service</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>

        <div>
          <label>Last Name:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>

        <div>
          <label>Street Address:</label>
          <input type="text" name="streetAddress" value={formData.streetAddress} onChange={handleChange} required />
        </div>

        <div>
          <label>City:</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} required />
        </div>

        <div>
          <label>State:</label>
          <select name="state" value={formData.state} onChange={handleChange}>
            {usStates.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Zip Code:</label>
          <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} required />
        </div>

        <div>
          <label>Phone Number:</label>
          <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
        </div>

        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div>
          <label>Service Type:</label>
          <select name="serviceType" value={formData.serviceType} onChange={handleChange}>
            {serviceTypes.map((service) => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Description of Work Needed:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="4"></textarea>
        </div>

        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default Services;
