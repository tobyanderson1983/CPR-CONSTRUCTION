import React from 'react';
import Services from '../../../basicPages/Services';
import ShowAllServices from '../ShowAllServices';

export const SearchServiceView = ({
  username,
  setUsername,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  handleSearchService,
  setView,
}) => (
  <div className="admin-form">
    <h3>Search Customer Services</h3>
    <p>Search by either Username (Email) or Full Name</p>
    <input type="text" placeholder="Enter username (email)" value={username} onChange={(e) => setUsername(e.target.value)} />
    <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
    <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
    <button onClick={handleSearchService}>Search</button>
    <button onClick={() => setView(null)}>Cancel</button>
  </div>
);

export const ShowAllServicesView = ({ services, setView }) => (
  <div className="form-container">
    <ShowAllServices data={services} />
    <div className="form-actions">
      <button onClick={() => {
        setView(null);
      }}>Cancel</button>
    </div>
  </div>
);

export const CreateServiceView = ({ serviceData, setView }) => (
  <div className="form-container">
    <Services data={serviceData} isAdminView={true} />
    <div className="form-actions">
      <button onClick={() => setView(null)}>Cancel</button>
    </div>
  </div>
);
