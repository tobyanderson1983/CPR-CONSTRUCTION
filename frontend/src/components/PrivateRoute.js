// //PrivateRoute.js

// import React from 'react';
// // import { Navigate, Outlet } from 'react-router-dom';
// import { Navigate } from 'react-router-dom';
// import AdminDashboard from './../pages/AdminDashboard';

// const PrivateRoute = ({ element, ...rest }) => {
//   const token = localStorage.getItem('token');

//   // Return to outlet if the token is found, otherwise navigate to login
//   // return token ? <AdminDashboard /> : <Navigate to="/login" />;
//   return token ? <AdminDashboard /> : <Navigate to="/login" />;
// };

// export default PrivateRoute;

import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token"); // Check if user is authenticated
  const role = localStorage.getItem("role");   // Check user's role
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;

