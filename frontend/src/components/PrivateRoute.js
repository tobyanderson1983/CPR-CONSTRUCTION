//PrivateRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem('token');

  // Return the element if the token is found, otherwise navigate to services
  return token ? element : <Navigate to="/services" />;
};

export default PrivateRoute;
