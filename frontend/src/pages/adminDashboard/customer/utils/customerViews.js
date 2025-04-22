import React from 'react';
import Services from '../../../basicPages/Services';
import ShowAllServices from '../ShowAllServices';
import '../../css/SearchView.css';

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
  <div className='search-container-wraper'>
      <div className='search-container'>
        <h1>Search either Username (Email) or Full Name</h1>
        <input type="text" placeholder="Enter username (email)" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <button onClick={handleSearchService}>Search</button>
        <button onClick={() => setView(null)}>Cancel</button>
      </div>
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
    <Services data={serviceData} isAdminView={true} isCreateMode={true}/>
    <div className="form-actions">
      <button onClick={() => setView(null)}>Cancel</button>
    </div>
  </div>
);
