//Services.js

import React, { useState } from 'react';
import axios from 'axios';
import './css/Services.css';  // Import the CSS file

const Services = () => {
  const [formData, setFormData] = useState({
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

  const usStates = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
  const serviceTypes = ["Roofing", "Remodel", "Deck", "Fence", "Other"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/services', formData);
      console.log(res.data);
      const firstName = res.data.data.firstName;
      const lastName = res.data.data.lastName;
      alert(`Thanks, ${firstName} ${lastName}! Your service request has been submitted!`);
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
      alert('Error submitting service request. Please try again.');
    }
  };

  return (
    <div className="services-container">
      <form className="services-form" onSubmit={handleSubmit}>
        <h1>Request a Service</h1>

        {/* First Name & Last Name - Side by Side */}
        <div className="flex-group">
          <div className="form-group">
            <label>First Name:</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange}  required 
            aria-label="First Name" placeholder="First Name"/>
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required 
            aria-label="Last Name" placeholder="Last Name"/>
          </div>
        </div>

        {/* Street Address - Full Width */}
        <div className="form-group">
          <label>Street Address:</label>
          <input type="text" name="streetAddress" value={formData.streetAddress} onChange={handleChange} required 
          aria-label="Street Address" placeholder="Street Address"/>
        </div>

        {/* City, State & Zip Code - Side by Side */}
        <div className="flex-group" id="city-state-zip-group">
          <div className="form-group">
            <label>City:</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} required 
            aria-label="City" placeholder="City"/>
          </div>
          <div className="form-group">
            <label>State:</label>
            <select name="state" value={formData.state} onChange={handleChange}>
              {usStates.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Zip Code:</label>
            <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} required 
            aria-label="Zip Code" placeholder="Zip Code"/>
          </div>
        </div>

        {/* Phone Number & Email - Side by Side */}
        <div className="flex-group">
          <div className="form-group">
            <label>Phone Number:</label>
            <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required 
            aria-label="Phone Number" placeholder="Phone Number"/>
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required 
            aria-label="Email" placeholder="Email"/>
          </div>
        </div>

        {/* Service Type - Full Width */}
        <div className="form-group">
          <label>Service Type:</label>
          <select name="serviceType" value={formData.serviceType} onChange={handleChange}>
            {serviceTypes.map((service) => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>
        </div>

        {/* Description - Full Width */}
        <div className="form-group" id="textarea">
          <label>Description of Work Needed:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="4"
          aria-label="Description of Work Needed" placeholder="Description of Work Needed"></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default Services;
