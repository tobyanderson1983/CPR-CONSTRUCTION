// EmployeeDashboard.js

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const EmployeeDashboard = () => {
    const [view, setView] = useState(null);
    const location = useLocation(); // ✅ Get location from React Router
    const storedAdmin = JSON.parse(localStorage.getItem('employeeName'));
    const fullName = `${storedAdmin?.firstName || ''} ${storedAdmin?.lastName || ''}`.trim();
   
    return (

        // *****REMEMBER all data below this line are just filler template information to help get things started***

        <div className="admin-dashboard">
          {/* Conditionally Show h2 Only When View is Null--if needed--origninally fro adminDashboard */}
          {view === null && <h2>Welcome to the employee dashboard, {fullName}!</h2>}
    
          {/* Conditionally Show Buttons or Cancel Button */}
          {view === null ? (
            <div className="dashboard-container">
              {/* Administrator Management */}
              <div className="dashboard-section">
                <button onClick={() => setView('searchAdmin')}>Work Schedule</button>
                <button onClick={() => setView('showAllAdmins')}>Hours Worked</button>
                <button onClick={() => setView('createAdmin')}>Request Time-off</button>
              </div>
    
              {/* Employee Management */}
              <div className="dashboard-section">
                <button onClick={() => setView('searchEmployee')}>PTO</button>
                <button onClick={() => setView('showAllEmployees')}>Sick Time</button>
                <button onClick={() => setView('createEmployee')}>vacation Fund</button>
              </div>
    
              {/* Service Management */}
              <div className="dashboard-section">
                <button onClick={() => setView('searchService')}>Retirement</button>
              </div>
    
            </div>
          ) : null}

        {view === 'createService' && (
            <div className="form-container">
                {/* <Services data={serviceData} isAdminView={true} /> */}
                <div className="form-actions">
                    <button onClick={() => setView(null)}>Cancel</button>
                </div>
            </div>
        )}
    </div>
  );    
};

export default EmployeeDashboard;
