//PrivateRoute.js

import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import AdminDashboard from './../pages/AdminDashboard';

const PrivateRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem('token');

  // Return to outlet if the token is found, otherwise navigate to login
  // return token ? <AdminDashboard /> : <Navigate to="/login" />;
  return token ? <AdminDashboard /> : <Navigate to="/login" />;
};

export default PrivateRoute;
