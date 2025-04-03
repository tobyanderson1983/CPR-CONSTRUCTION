import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/Services.css';

const Services = ({ isAdminView }) => {

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', streetAddress: '', city: '', state: '',
    zipCode: '', phoneNumber: '', username: '', password: '', confirmPassword: '',
    serviceType: '', description: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e) => {

    e.preventDefault();
    
    if(isAdminView){
      const role = 'admin';
      const formPayload = new FormData();

      // formData.append('fieldName', fieldValue);
      // Append the 'role' variable to formData

      formPayload.append('firstName', formData.firstName);
      formPayload.append('lastName', formData.lastName);
      formPayload.append('streetAddress', formData.streetAddress);
      formPayload.append('city', formData.city);
      formPayload.append('state', formData.state);
      formPayload.append('zipCode', formData.zipCode);
      formPayload.append('phoneNumber', formData.phoneNumber);
      formPayload.append('username', formData.username);
      formPayload.append('serviceType', formData.serviceType);
      formPayload.append('description', formData.description);
      formPayload.append('role', role);

      try {
        const res = await axios.post('http://localhost:5000/api/auth/services', formPayload, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }});
        alert(res.data.message);
        //change navigate to navigate('/adminDashboard'); 
        navigate('/'); 
      } catch (error) {
        console.error('Error submitting service request:', error);
        alert('Failed to submit request.');
      }
    }else{
      if (!isAdminView && formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
  
      try {
        const res = await axios.post('http://localhost:5000/api/auth/services', formData);
        alert(res.data.message);
        navigate('/');
      } catch (error) {
        console.error('Error submitting service request:', error);
        alert('Failed to submit request.');
      }
    }
  };

  return (
    <div className="services-form-container">
      <h2>Request a Service</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
        <input type="text" name="streetAddress" placeholder="Street Address" onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" onChange={handleChange} required />
        <select name="state" onChange={handleChange} required>
          <option value="">Select State</option>
          <option value="WA">WA</option>
          {/* Add all US states here */}
        </select>
        <input type="text" name="zipCode" placeholder="Zip Code" onChange={handleChange} required />
        <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required />
        <input type="email" name="username" placeholder="Email" onChange={handleChange} required />

        {/* Only show password fields if not in admin view */}
        {!isAdminView && (
          <>
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
          </>
        )}

        <select name="serviceType" onChange={handleChange} required>
          <option value="">Select Service Type</option>
          <option value="roofing">Roofing</option>
          <option value="remodel">Remodel</option>
          <option value="fence">Fence</option>
          <option value="deck">Deck</option>
        </select>
        <textarea name="description" placeholder="Service Description" onChange={handleChange} required></textarea>
        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default Services;
