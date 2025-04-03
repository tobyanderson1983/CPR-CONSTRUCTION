//AdminDashboard.js

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Administrator from './Administrator';
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
  const [email, setEmail] = useState('');  
  const location = useLocation();
  const fullName = `${location.state?.firstName || "Guest"} ${location.state?.lastName || ""}`.trim();

  //create a new administrative employee
  const handleCreateAdmin = async (adminData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/admin', adminData);
      alert('Administrator created successfully!');
      console.log(res);
      setView(null);
    } catch (error) {
      console.error('Error creating admin:', error);
      alert('Failed to create administrator.');
    }
  };

  //edit an existing administrative employee
  const handleEditAdmin = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/auth/admin');
      setAdminData(res.data);
      setView('admin');
    } catch (error) {
      console.error('Error fetching admin:', error);
    }
  };

  //create a new regular employee
  const handleCreateEmployee = async (employeeData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/employee', employeeData);
      alert('Employee created successfully!');
      console.log(res);
      setView(null);
    } catch (error) {
      console.error('Error creating employee:', error);
      alert('Failed to create employee.');
    }
  };

  //edit an existing regular employee
  const handleEditEmployee = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/auth/employee');
      setEmployeeData(res.data);
      setView('employee');
    } catch (error) {
      console.error('Error fetching employee:', error);
    }
  };

  //new handleSearchService------------------------------------------------------------------

  const handleSearchService = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/auth/services?email=${email}`);
      setServices(res.data);
      setView('serviceResults');
      //was setView('service')
    } catch (error) {
      console.error('Error fetching service:', error);
    }
  };

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
            <button onClick={handleEditAdmin}>Edit Administrator</button>
          </div>

          {/* Employee Management */}
          <div className="dashboard-section">
            <button onClick={() => setView('createEmployee')}>Create New Employee</button>
            <button onClick={handleEditEmployee}>Edit Employee</button>
          </div>

          {/* Service Management */}
          <div className="dashboard-section">
            <button onClick={() => setView('createService')}>Create New Service</button>
            <button onClick={() => setView('editService')}>Edit an Existing Service</button>
          </div>

          <div className='dashboard-section'>
            <button onClick={() => setView('searchService')}>Search Customer Services</button>

            <button onClick={() => setView('showAllServices')}>Show All Services</button>
          </div>
        </div>
      ) : null}

      {/* Display Forms with Submit & Cancel Buttons Inside */}
      {view === 'createAdmin' && (
        <div className="form-container">
          <Administrator onSubmit={handleCreateAdmin} />
          <div className="form-actions">
            <button onClick={() => setView(null)}>Cancel</button>
          </div>
        </div>
      )}

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
      
      {view === 'editService' && (
        <div className="form-container">
          <input 
            type="email" 
            placeholder="Enter email to search" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <div className="form-actions">
            <button onClick={handleSearchService}>Search Customer</button>
            <button onClick={() => setView(null)}>Cancel</button>
          </div>
        </div>
      )}
      
      {/* {view === null && (
        <div className='dashboard-section'>
          <button onClick={() => setView('searchService')}>Search Customer Services</button>
        </div>
      )} */}

      {view === 'searchService' && (
        <div>
          <input type="email" placeholder="Enter customer email" onChange={(e) => setEmail(e.target.value)} />
          <button onClick={handleSearchService}>Search</button>
          <button onClick={() => setView(null)}>Cancel</button>
        </div>
      )}

      {view === 'serviceResults' && (
        <div>
          <h3>Service Requests for {email}</h3>
          {services.length > 0 ? (
            <ul>
              {services.map((service, index) => (
                <li key={index}>
                  {service.serviceType} - {service.status} - {new Date(service.dateRequested).toLocaleDateString()}
                </li>
              ))}
            </ul>
          ) : (
            <p>No service requests found.</p>
          )}
          <button onClick={() => setView(null)}>Back</button>
        </div>
      )}

      {/* showing as an examle for the one below it */}

      {/* {view === 'createService' && (
        <div className="form-container">
          <Services data={serviceData} isAdminView={true} />
          <div className="form-actions">
            <button onClick={() => setView(null)}>Cancel</button>
          </div>
        </div>
      )}       */}


      {view === 'showAllServices' && (
        <div className="form-container">
          <ShowAllServices 
            // data={serviceData} isAdminView={true} 
          />
          <div className="form-actions">
            <button onClick={() => setView(null)}>Cancel</button>
          </div>
        </div>
      )}      

    </div>
  );
};

export default AdminDashboard;

//----------------------------------new code

// import React, { useState } from 'react';
// import axios from 'axios';

// const AdminDashboard = () => {
//   const [view, setView] = useState(null);
//   const [services, setServices] = useState([]);
//   const [email, setEmail] = useState('');

//   const handleSearchService = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/auth/services?email=${email}`);
//       setServices(res.data);
//       setView('serviceResults');
//     } catch (error) {
//       console.error('Error fetching service:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Admin Dashboard</h2>

//       {view === null && (
//         <div>
//           <button onClick={() => setView('searchService')}>Search Customer Services</button>
//         </div>
//       )}

//       {view === 'searchService' && (
//         <div>
//           <input type="email" placeholder="Enter customer email" onChange={(e) => setEmail(e.target.value)} />
//           <button onClick={handleSearchService}>Search</button>
//           <button onClick={() => setView(null)}>Cancel</button>
//         </div>
//       )}

//       {view === 'serviceResults' && (
//         <div>
//           <h3>Service Requests for {email}</h3>
//           {services.length > 0 ? (
//             <ul>
//               {services.map((service, index) => (
//                 <li key={index}>
//                   {service.serviceType} - {service.status} - {new Date(service.dateRequested).toLocaleDateString()}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No service requests found.</p>
//           )}
//           <button onClick={() => setView(null)}>Back</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;


