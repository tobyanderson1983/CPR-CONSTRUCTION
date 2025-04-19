
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { handleCreateAdmin, handleSearchAdmin } from './admin/utils/adminHandlers';
import { SearchAdminView, ShowAllAdminsView, CreateAdminView } from './admin/utils/adminViews';
import { handleCreateEmployee, handleSearchEmployee } from './employee/utils/employeeHandlers';
import { SearchEmployeeView, ShowAllEmployeesView, CreateEmployeeView } from './employee/utils/employeeViews';
import { handleSearchService } from './customer/utils/customerHandlers';
import { SearchServiceView, ShowAllServicesView, CreateServiceView } from './customer/utils/customerViews';
import './css/AdminDashboard.css';

const AdminDashboard = () => {
  const [view, setView] = useState(null);
  const [serviceData] = useState(null);
  const [services, setServices] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const storedAdmin = JSON.parse(localStorage.getItem('adminName'));
  const fullName = `${storedAdmin?.firstName || ''} ${storedAdmin?.lastName || ''}`.trim();

  useEffect(() => {
    const stateExists = !!location.state?.firstName && !!location.state?.lastName;
    const adminInStorage = localStorage.getItem('adminName');

    if (!stateExists && !adminInStorage) {
      navigate('/');
    }
  }, [location, navigate]);

  //========================= JSX =========================

  return (
    <div className="admin-dashboard">
      {view === null && <h2>Welcome, {fullName}!</h2>}

      {view === null && (
        <div className="dashboard-container">
          <div className="dashboard-section">
            <button onClick={() => setView('searchAdmin')}>Search Administrator</button>
            <button onClick={() => setView('showAllAdmins')}>View All Administrators</button>
            <button onClick={() => setView('createAdmin')}>Create New Administrator</button>
          </div>

          <div className="dashboard-section">
            <button onClick={() => setView('searchEmployee')}>Search Employee</button>
            <button onClick={() => setView('showAllEmployees')}>View All Employees</button>
            <button onClick={() => setView('createEmployee')}>Create New Employee</button>
          </div>

          <div className="dashboard-section">
            <button onClick={() => setView('searchService')}>Search Service</button>
            <button onClick={() => setView('showPendingServices')}>Pending Services</button>
            <button onClick={() => setView('showAllServices')}>View All Services</button>
            <button onClick={() => setView('createService')}>Create New Service</button>
          </div>
        </div>
      )}

      {/* --------------------------ADMIN VIEWS--------------------------- */}

      {view === 'searchAdmin' && (
        <SearchAdminView
          username={username}
          setUsername={setUsername}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          handleSearchAdmin={() =>
            handleSearchAdmin(username, firstName, lastName, setAdmins, setView)
          }
          setView={setView}
        />
      )}

      {view === 'showAllAdmins' && (
        <ShowAllAdminsView
          admins={admins}
          setView={setView}
        />
      )}

      {view === 'createAdmin' && (
        <CreateAdminView
          handleCreateAdmin={(adminData) =>
            handleCreateAdmin(adminData, setView)
          }
          setView={setView}
        />
      )}

      {/* --------------------------------------EMPLOYEE VIEWS-------------------------------------- */}
      
      {view === 'searchEmployee' && (
        <SearchEmployeeView
          username={username}
          setUsername={setUsername}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          handleSearchEmployee={() =>
            handleSearchEmployee(username, firstName, lastName, setEmployees, setView)
          }
          setView={setView}
        />
      )}

      {view === 'showAllEmployees' && (
        <ShowAllEmployeesView
          employees={employees}
          setView={setView}
        />
      )}  
      
       {view === 'createEmployee' && (
        <CreateEmployeeView
          handleCreateEmployee={(employeeData) =>
            handleCreateEmployee(employeeData, setView)
          }
          setView={setView}
        />
      )}

      {/* --------------------------SERVICE VIEWS--------------------------------- */}

      {view === 'searchService' && (
        <SearchServiceView
          username={username}
          setUsername={setUsername}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          handleSearchService={() =>
            handleSearchService(
              username,
              firstName,
              lastName,
              setServices,
              setView,
              setUsername,
              setFirstName,
              setLastName
            )
          }
          setView={setView}
        />
      )}

      {view === 'showAllServices' && (
        <ShowAllServicesView
          services={services}
          setView={setView}
        />
      )}

      {view === 'createService' && (
        <CreateServiceView
          serviceData={serviceData}
          setView={setView}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
