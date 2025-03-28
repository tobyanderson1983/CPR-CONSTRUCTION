import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import Administrator from './Administrator';
import Employee from './Employee';
import Services from './Services';
import axios from 'axios';


const AdminDashboard = ({ firstName, lastName }) => {
  const [view, setView] = useState(null);
  const [adminData, setAdminData] = useState(null);
  const [employeeData, setEmployeeData] = useState(null);
  const [serviceData, setServiceData] = useState(null);
  const [email, setEmail] = useState('');
  //adding username temporarily instead of firstname lastname
  const location = useLocation();
  const fullName = `${location.state?.firstName || "Guest"} ${location.state?.lastName || ""}`.trim();


  const handleCreateAdmin = async (adminData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/admin', adminData);
      console.log(res.data)
      alert('Administrator created successfully!');

      console.log('handleCreateAdmin');
      console.log(res.data);
      
      setView(null); // Hide the form after submission
    } catch (error) {
      console.error('Error creating admin:', error);
      alert('Failed to create administrator.');
    }
  };

  const handleEditAdmin = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/auth/admin');
      setAdminData(res.data);
      setView('admin');
    } catch (error) {
      console.error('Error fetching admin:', error);
    }
  };

  const handleCreateEmployee = async (employeeData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/employee', employeeData);
      console.log(res.data)
      alert('Employee created successfully!');

      console.log('handleCreateEmployee');
      console.log(res.data);
      
      setView(null); // Hide the form after submission
    } catch (error) {
      console.error('Error creating employee:', error);
      alert('Failed to create employee.');
    }
  };

  const handleEditEmployee = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/auth/employee');
      setEmployeeData(res.data);
      setView('employee');
    } catch (error) {
      console.error('Error fetching employee:', error);
    }
  };

  const handleSearchService = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/auth/services?email=${email}`);
      setServiceData(res.data);
      setView('service');
    } catch (error) {
      console.error('Error fetching service:', error);
    }
  };

  return (
    <div>
      <h1>Welcome to the Administrative dashboard, {fullName}!</h1>
      <div>
        <h2>Administrator Management</h2>
        <button onClick={() => setView('createAdmin')}>Create New Administrator</button>
        <button onClick={handleEditAdmin}>Edit Administrator</button>
      </div>
      
      <div>
        <h2>Employee Management</h2>
        <button onClick={() => setView('createEmployee')}>Create New Employee</button>
        <button onClick={handleEditEmployee}>Edit Employee</button>
      </div>
      
      <div>
        <h2>Service Management</h2>
        <button onClick={() => setView('service')}>Create New Service</button>
        <input 
          type="email" 
          placeholder="Enter email to search" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <button onClick={handleSearchService}>Search</button>
      </div>

      {view === 'createAdmin' && <Administrator onSubmit={handleCreateAdmin} />}
      {view === 'admin' && <Administrator data={adminData} />}
      {view === 'createEmployee' && <Employee onSubmit={handleCreateEmployee} />}
      {view === 'employee' && <Employee data={employeeData} />}
      {view === 'service' && <Services data={serviceData} />}
    </div>
  );
};

export default AdminDashboard;
