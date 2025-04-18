//adminViews.js
import React from 'react';
import ShowAllAdmins from '../ShowAllAdmins';
import Administrator from '../Administrator';

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
  <div>
    <p>Search by either Username (Email) or Full Name</p>
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
