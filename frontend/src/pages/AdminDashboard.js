//AdminDashboard.js

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Administrator from './Administrator';
import ShowAllAdmins from './ShowAllAdmins';
import Employee from './Employee';
import Services from './Services';
import ShowAllServices from './ShowAllServices';
import axios from 'axios';
import './css/AdminDashboard.css';

const AdminDashboard = () => {
  const [view, setView] = useState(null);
  const [adminData, setAdminData] = useState(null);
  const [employeeData, setEmployeeData] = useState(null);
  const [serviceData] = useState(null);
  const [services, setServices] = useState([]);
  //--------------
  const [admins, setAdmins] = useState([]);
  //--------------
  const [username, setUsername] = useState('');  
  const location = useLocation();
  const fullName = `${location.state?.firstName || "Guest"} ${location.state?.lastName || ""}`.trim();

  //create a new administrative employee
  const handleCreateAdmin = async (adminData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/admins/', adminData);
      alert('Administrator created successfully!');
      setView(null);
    } catch (error) {
      console.error('Error creating admin:', error);
      alert('Failed to create administrator.');
    }
  };

  // view all admins
  const handleGetAdmins = async (adminData) => {
    try {
      const res = await axios.get('http://localhost:5000/api/admins/', adminData);
      alert('Administrator created successfully!');
      console.log(res);
      setView(null);
    } catch (error) {
      console.error('Error creating admin:', error);
      alert('Failed to create administrator.');
    }
  };

  //view a single admin

  //edit an existing administrative employee
  const handleEditAdmin = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admins/');
      setAdminData(res.data);
      setView('admin');
    } catch (error) {
      console.error('Error fetching admin:', error);
    }
  };

  //dlete an admin

  //create a new regular employee
  const handleCreateEmployee = async (employeeData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/employees/', employeeData);
      alert('Employee created successfully!');
      console.log(res);
      setView(null);
    } catch (error) {
      console.error('Error creating employee:', error);
      alert('Failed to create employee.');
    }
  };

  //search for an employee to edit
  const handleSearchEmployee = async () => {
    // try {
    //   const res = await axios.get(`http://localhost:5000/api/auth/customerServices?username=${username}`);
    //   console.log(res.data.user);
    //   setServices(res.data.user.serviceRequests || []); // only set the services array
    //   setView('showAllServices');
    // } catch (error) {
    //   console.error('Error fetching service:', error);
    // }
  };

  //edit an existing regular employee
  // const handleEditEmployee = async () => {
  //   try {
  //     const res = await axios.get('http://localhost:5000/api/auth/employee');
  //     setEmployeeData(res.data);
  //     setView('employee');
  //   } catch (error) {
  //     console.error('Error fetching employee:', error);
  //   }
  // };

  // const handleSearchService = async () => {
  //   try {
  //     const res = await axios.get(`http://localhost:5000/api/customers?username=${username}`);
  //     console.log(res.data.user);
  //     setServices(res.data.user.serviceRequests || []); // only set the services array
  //     setView('showAllServices');
  //   } catch (error) {
  //     console.error('Error fetching service:', error);
  //   }
  // };
  
  const handleSearchService = async () => {
    try {
      // Get the token from localStorage or wherever you store it
      const token = localStorage.getItem("token");
  
      // Make the GET request with the Authorization header
      const res = await axios.get(`http://localhost:5000/api/customers/oneCustomer?username=${username}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add the Bearer token here
        },
      });
  
      setServices(res.data.services || []); // Set services array
      setView('showAllServices');
    } catch (error) {
      console.error('Error fetching service:', error);
    }
  };
  
  
// --------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------

  return (
    <div className="admin-dashboard">
      {/* Conditionally Show h2 Only When View is Null */}
      {view === null && <h2>Welcome, {fullName}!</h2>}

      {/* Conditionally Show Buttons or Cancel Button */}
      {view === null ? (
        <div className="dashboard-container">
          {/* Administrator Management */}
          <div className="dashboard-section">
            <button onClick={() => setView('createAdmin')}>Create New Administrator</button>
            <button onClick={() => setView('showAllAdmins')}>View All Admins</button>
            <button onClick={handleEditAdmin}>Edit Administrator</button>
          </div>

          {/* Employee Management */}
          <div className="dashboard-section">
            <button onClick={() => setView('createEmployee')}>Create New Employee</button>
            <button onClick={() => setView('editEmployee')} >Edit Employee</button>
          </div>

          {/* Service Management */}
          <div className="dashboard-section">
            <button onClick={() => setView('createService')}>Create New Service</button>
            <button onClick={() => setView('searchService')}>Edit an Existing Service</button>
            <button onClick={() => setView('showAllServices')}>Show All Services</button>
          </div>

        </div>
      ) : null}

      {/* ------------------------------------------------------------------------------------------------------ */}
      {/* ------------------------------------------------------------------------------------------------------ */}

      {/* Display Forms with Submit & Cancel Buttons Inside */}
      {view === 'createAdmin' && (
        <div className="form-container">
          <Administrator onSubmit={handleCreateAdmin} />
          <div className="form-actions">
            <button onClick={() => setView(null)}>Cancel</button>
          </div>
        </div>
      )}

      {/* adding an area to show all admin users */}

      {view === 'showAllAdmins' && (
        <div className="form-container">
          <ShowAllAdmins 
            data={admins}
          />
          <div className="form-actions">
            <button onClick={() => setView(null)}>Cancel</button>
          </div>
        </div>
      )}  

      {/* ------------------------------------------ */}

      {view === 'admin' && (
        <div className="form-container">
          <Administrator data={adminData} />
          <div className="form-actions">
            <button onClick={() => setView(null)}>Cancel</button>
          </div>
        </div>
      )}

      {view === 'createEmployee' && (
        <div className="form-container">
          <Employee onSubmit={handleCreateEmployee} />
          <div className="form-actions">
            <button onClick={() => setView(null)}>Cancel</button>
          </div>
        </div>
      )}

      {view === 'employee' && (
        <div className="form-container">
          <Employee data={employeeData} />
          <div className="form-actions">
            <button onClick={() => setView(null)}>Cancel</button>
          </div>
        </div>
      )}

      {view === 'createService' && (
        <div className="form-container">
          <Services data={serviceData} isAdminView={true} />
          <div className="form-actions">
            <button onClick={() => setView(null)}>Cancel</button>
          </div>
        </div>
      )}

      {view === 'searchService' && (
        <div>
          <input type="email" placeholder="Enter customer email" onChange={(e) => setUsername(e.target.value)} />
          <button onClick={handleSearchService}>Search</button>
          <button onClick={() => setView(null)}>Cancel</button>
        </div>
      )}

      {view === 'showAllServices' && (
        <div className="form-container">
          <ShowAllServices 
            data={services}
          />
          <div className="form-actions">
            <button onClick={() => {
              setView(null); 
              setServices([]);
            }}>Cancel</button>
          </div>
        </div>
      )}     

       {view === 'editEmployee' && (
        <div>
          <input type="email" placeholder="Enter employee email" onChange={(e) => setUsername(e.target.value)} />
          <button 
            onClick={handleSearchEmployee}
          >Search</button>
          <button onClick={() => setView(null)}>Cancel</button>
        </div>
      )} 

    </div>
  );
};

export default AdminDashboard;