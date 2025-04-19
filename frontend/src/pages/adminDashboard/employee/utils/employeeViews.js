import React from 'react';
import ShowAllEmployees from '../ShowAllEmployees';
import Employee from '../Employee';

export const SearchEmployeeView = ({
    username,
    setUsername,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    handleSearchEmployee,
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
      <button onClick={handleSearchEmployee}>Search</button>
      <button onClick={() => setView(null)}>Cancel</button>
    </div>
  );
  
  export const ShowAllEmployeesView = ({ employees, setView }) => (
    <div className="form-container">
      <ShowAllEmployees data={employees} />
      <div className="form-actions">
        <button onClick={() => setView(null)}>Cancel</button>
      </div>
    </div>
  );
  
  export const CreateEmployeeView = ({ handleCreateEmployee, setView }) => (
    <div className="form-container">
      <Employee onSubmit={handleCreateEmployee} onCancel={() => setView(null)} />
    </div>
  );