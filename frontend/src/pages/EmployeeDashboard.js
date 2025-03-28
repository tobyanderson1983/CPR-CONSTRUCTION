// EmployeeDashboard.js

import React from 'react';
import { useLocation } from 'react-router-dom';

const EmployeeDashboard = () => {
    const location = useLocation(); // ✅ Get location from React Router
    const fullName = `${location.state?.firstName || "Guest"} ${location.state?.lastName || ""}`.trim();

    return (
        <div>
            <h1>Welcome to your employee dashboard, {fullName}!</h1>
        </div>
    );
}

export default EmployeeDashboard;
