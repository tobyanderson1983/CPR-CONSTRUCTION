// EmployeeDashboard.js

import React from 'react';
import { useLocation } from 'react-router-dom';

const EmployeeDashboard = () => {
    const location = useLocation(); // ✅ Get location from React Router
    const storedAdmin = JSON.parse(localStorage.getItem('employeeName'));
    const fullName = `${storedAdmin?.firstName || ''} ${storedAdmin?.lastName || ''}`.trim();
    return (
        <div>
            <h1>Welcome to your employee dashboard, {fullName}!</h1>
        </div>
    );
}

export default EmployeeDashboard;
