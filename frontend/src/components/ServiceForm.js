import React from 'react';
import { US_STATES } from './../constants/serviceFormConstants';

const ServiceForm = ({
  formData,
  handleChange,
  handleSubmit,
  handleCancel,
  isEditMode,
  isAdminView,
  isCreateMode
}) => (
  <form onSubmit={handleSubmit} className="services-form">
    <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
    <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
    <input name="streetAddress" placeholder="Street Address" value={formData.streetAddress} onChange={handleChange} required />
    <input name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
    <div className="state-dropdown">
      <select name="state" value={formData.state} onChange={handleChange} required>
        <option value="">Select State</option>
        {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
    </div>
    <input name="zipCode" placeholder="Zip Code" value={formData.zipCode} onChange={handleChange} required />
    <input name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
    <input type="email" name="username" placeholder="Email" value={formData.username} onChange={handleChange} required />

    <div className="service-type-dropdown">
      <select name="serviceType" value={formData.serviceType} onChange={handleChange} required>
        <option value="">Select Service Type</option>
        <option value="roofing">Roofing</option>
        <option value="remodel">Remodel</option>
        <option value="fence">Fence</option>
        <option value="deck">Deck</option>
      </select>
    </div>

    <textarea name="description" placeholder="Service Description" value={formData.description} onChange={handleChange} required />
    
    {((!isEditMode && !isAdminView) || (isCreateMode && isAdminView)) && (
      <>
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
      </>
    )}

    <div className="form-actions">
      <button type="submit" className="submit-button">{isEditMode ? 'Update' : 'Submit'} Request</button>
      {isEditMode && (
        <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
      )}
    </div>
  </form>
);

export default ServiceForm;
