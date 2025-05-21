// File: frontend/src/components/customerViews.js
// Description: This file contains the SearchServiceView, ShowAllServicesView, and CreateServiceView components.
// These components are used to search for services, show all services, and create a new service respectively.

import ShowAllAdmins from './../pages/adminDashboard/admin/ShowAllAdmins';
import Administrator from './../pages/adminDashboard/admin/Administrator';
import './css/SearchView.css';

export const SearchAdminView = ({
  username,
  setUsername,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  handleSearchAdmin,
  setView
}) => (
  <div className='search-container-wraper'>
      <div className='search-container'>
        <h1>Search by either Username (Email) or Full Name</h1>
        <input
          type="text"
          placeholder="Enter username (email)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <button onClick={handleSearchAdmin}>Search</button>
        <button onClick={() => setView(null)}>Cancel</button>
      </div>
  </div>
  
);

export const ShowAllAdminsView = ({ admins, setView }) => (
  <div className="form-container">
    <ShowAllAdmins data={admins} />
    <div className="form-actions">
      <button onClick={() => setView(null)}>Cancel</button>
    </div>
  </div>
);

export const CreateAdminView = ({ handleCreateAdmin, setView }) => (
  <div className="form-container">
    <Administrator onSubmit={handleCreateAdmin} onCancel={() => setView(null)} />
  </div>
);
