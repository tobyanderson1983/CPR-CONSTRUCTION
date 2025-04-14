//Administrator.js

import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import './css/Administrator.css';

const Administrator = ({ onSubmit, onCancel }) => {
  const location = useLocation();
  const data = location.state?.admin || {};
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: data.firstName || '',
    lastName: data.lastName || '',
    streetAddress: data.streetAddress || '',
    city: data.city || '',
    state: data.state || 'WA',
    zipCode: data.zipCode || '',
    phoneNumber: data.phoneNumber || '',
    username: data.username || '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const changingPassword = formData.password || formData.confirmPassword;

    if (changingPassword && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
  
    
    // const {
    //   firstName, lastName, streetAddress, city, state,
    //   zipCode, phoneNumber, username, password
    // } = formData;

    // const updatedData = {
    //   ...formData,
    //   _id: data._id
    // };
    const { confirmPassword, ...safeData } = formData;
    console.log(formData)

    const updatedData = {
      ...safeData,
      _id: data._id
    };

    console.log('updated data: ', updatedData)


    onSubmit(updatedData);
    navigate("/adminDashboard");
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate("/adminDashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{data._id ? 'Edit' : 'Create'} Administrator</h2>

      <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
      <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
      <input type="text" name="streetAddress" placeholder="Street Address" value={formData.streetAddress} onChange={handleChange} required />
      <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />

      <select name="state" value={formData.state} onChange={handleChange}>
        {["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"].map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <input type="text" name="zipCode" pattern="\d{5}" placeholder="Enter Zip Code" value={formData.zipCode} onChange={handleChange} required />
      <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
      <input type="email" name="username" placeholder="Email" value={formData.username} onChange={handleChange} required />

      {/* Show password fields only when creating a new admin */}
      {!data._id && (
        <>
          <input type="password" name="password" placeholder="Password" minLength="6" value={formData.password} onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" minLength="6" value={formData.confirmPassword} onChange={handleChange} required />
        </>
      )}
    
     <div style={{ marginTop: '1rem' }}>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleCancel} style={{ marginLeft: '10px' }}>Cancel</button>
      </div>
    </form>
  );
};

export default Administrator;
