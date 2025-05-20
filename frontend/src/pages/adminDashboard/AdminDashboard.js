
import React, { useState, useEffect, useRef } from 'react';
import useAuthGuard from '../hooks/useAuthGuard';
import { handleCreateAdmin, handleSearchAdmin } from './admin/utils/adminHandlers';
import { SearchAdminView, ShowAllAdminsView, CreateAdminView } from './admin/utils/adminViews';
import { handleCreateEmployee, handleSearchEmployee } from './employee/utils/employeeHandlers';
import { SearchEmployeeView, ShowAllEmployeesView, CreateEmployeeView } from './employee/utils/employeeViews';
import { handleSearchService } from './customer/utils/customerHandlers';
import { SearchServiceView, ShowAllServicesView, CreateServiceView } from './customer/utils/customerViews';
import './css/AdminDashboard.css';

const AdminDashboard = () => {
  const authorized = useAuthGuard('admin');
  const [view, setView] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [serviceData] = useState(null);
  const [services, setServices] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const storedAdmin = JSON.parse(localStorage.getItem('user'));
  const fullName = `${storedAdmin?.firstName || ''} ${storedAdmin?.lastName || ''}`.trim();

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
        setSelectedCategory(null);
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setSelectedCategory(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [menuOpen]);

  if (!authorized) return null;

  const categoryOptions = {
    administrators: [
      { label: 'Search Administrator', view: 'searchAdmin' },
      { label: 'View All Administrators', view: 'showAllAdmins' },
      { label: 'Create New Administrator', view: 'createAdmin' },
    ],
    employees: [
      { label: 'Search Employee', view: 'searchEmployee' },
      { label: 'View All Employees', view: 'showAllEmployees' },
      { label: 'Create New Employee', view: 'createEmployee' },
    ],
    customers: [
      { label: 'Search Service', view: 'searchService' },
      { label: 'Pending Services', view: 'showPendingServices' },
      { label: 'View All Services', view: 'showAllServices' },
      { label: 'Create New Service', view: 'createService' },
    ],
  };

  return (
    <div className="admin-dashboard-container">
      {/* Hamburger Menu */}
      <div className="dashboard-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        &#9776;
      </div>

      {menuOpen && (
        <div className="dashboard-menu-dropdown" ref={menuRef}>
          {!selectedCategory ? (
            <>
              <button onClick={() => setSelectedCategory('administrators')}>Administrators</button>
              <button onClick={() => setSelectedCategory('employees')}>Employees</button>
              <button onClick={() => setSelectedCategory('customers')}>Customers</button>
            </>
          ) : (
            <>
              <button onClick={() => setSelectedCategory(null)}>← Back</button>
              {categoryOptions[selectedCategory].map((option, index) => (
                <button key={index} onClick={() => { setView(option.view); setMenuOpen(false); }}>
                  {option.label}
                </button>
              ))}
            </>
          )}
        </div>
      )}

      {view === null && <h1 id='greeting'>Welcome to the Admin Dashboard, {fullName.toUpperCase()}!</h1>}

      {/* ---------- VIEWS ---------- */}
      {view === 'searchAdmin' && (
        <SearchAdminView
          username={username}
          setUsername={setUsername}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          handleSearchAdmin={() => handleSearchAdmin(username, firstName, lastName, setAdmins, setView)}
          setView={setView}
        />
      )}

      {view === 'showAllAdmins' && <ShowAllAdminsView admins={admins} setView={setView} />}
      {view === 'createAdmin' && (
        <CreateAdminView handleCreateAdmin={(adminData) => handleCreateAdmin(adminData, setView)} setView={setView} />
      )}

      {view === 'searchEmployee' && (
        <SearchEmployeeView
          username={username}
          setUsername={setUsername}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          handleSearchEmployee={() => handleSearchEmployee(username, firstName, lastName, setEmployees, setView)}
          setView={setView}
        />
      )}

      {view === 'showAllEmployees' && <ShowAllEmployeesView employees={employees} setView={setView} />}
      {view === 'createEmployee' && (
        <CreateEmployeeView handleCreateEmployee={(data) => handleCreateEmployee(data, setView)} setView={setView} />
      )}

      {view === 'searchService' && (
        <SearchServiceView
          username={username}
          setUsername={setUsername}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          handleSearchService={() => handleSearchService(username, firstName, lastName, setServices, setView, setUsername, setFirstName, setLastName)}
          setView={setView}
        />
      )}

      {view === 'showAllServices' && <ShowAllServicesView services={services} setView={setView} />}
      {view === 'createService' && <CreateServiceView serviceData={serviceData} setView={setView} />}
    </div>
  );
};

export default AdminDashboard;
