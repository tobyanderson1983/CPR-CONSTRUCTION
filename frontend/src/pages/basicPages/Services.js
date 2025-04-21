import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/Services.css';

const Services = ({ isAdminView, isCreateMode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state?.service || {};
  const serviceId = location.pathname.split('/').pop();

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
    confirmPassword: '',
    serviceType: data.serviceType || '',
    description: data.description || '',
  });

  const isEditMode = Boolean(data._id);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchFullCustomerData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/customers/service/${serviceId}`);
        const { customer, service } = res.data;

        setFormData({
          firstName: customer.firstName,
          lastName: customer.lastName,
          streetAddress: customer.streetAddress,
          city: customer.city,
          state: customer.state,
          zipCode: customer.zipCode,
          phoneNumber: customer.phoneNumber,
          username: customer.username,
          password: '',
          confirmPassword: '',
          serviceType: service.serviceType || '',
          description: service.description || '',
        });
      } catch (err) {
        console.error('Failed to fetch full customer data:', err);
      }
    };

    if (isEditMode) {
      fetchFullCustomerData();
    }
  }, [isEditMode, serviceId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEditMode && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const { confirmPassword, ...safeData } = formData;

    try {
      if (isEditMode) {
        await axios.put(`http://localhost:5000/api/customers/services/${data._id}`, {
          serviceType: formData.serviceType,
          description: formData.description,
        });
        alert('Service updated successfully!');
      } else {
        if (isAdminView) {
          const formPayload = new FormData();
          Object.entries({
            ...safeData,
            role: 'admin',
          }).forEach(([key, value]) => {
            formPayload.append(key, value);
          });

          await axios.post('http://localhost:5000/api/customers/', formPayload, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        } else {
          await axios.post('http://localhost:5000/api/customers/', formData);
        }

        alert('Service request submitted successfully!');
      }

      navigate(isAdminView ? '/adminDashboard' : '/');
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Failed to submit request.');
    }
  };

  const handleCancel = () => {
    navigate(isAdminView ? '/adminDashboard' : '/');
  };

  return (
    <div className="services-form-container">
      <h2>{isEditMode ? 'Edit' : 'Request'} Service</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
        <input type="text" name="streetAddress" placeholder="Street Address" value={formData.streetAddress} onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />

        <select name="state" value={formData.state} onChange={handleChange} required>
          <option value="">Select State</option>
          {[
            'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO',
            'MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'
          ].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <input type="text" name="zipCode" placeholder="Zip Code" value={formData.zipCode} onChange={handleChange} required />
        <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
        <input type="email" name="username" placeholder="Email" value={formData.username} onChange={handleChange} required />

        {((!isEditMode && !isAdminView) || (isCreateMode && isAdminView))&& (
          <>
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
          </>
        )}

        <select name="serviceType" value={formData.serviceType} onChange={handleChange} required>
          <option value="">Select Service Type</option>
          <option value="roofing">Roofing</option>
          <option value="remodel">Remodel</option>
          <option value="fence">Fence</option>
          <option value="deck">Deck</option>
        </select>

        <textarea name="description" placeholder="Service Description" value={formData.description} onChange={handleChange} required></textarea>

        <div className="form-actions">
          <button type="submit" className="submit-button">
            {isEditMode ? 'Update' : 'Submit'} Request
          </button>
          {isEditMode && (
            <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Services;
