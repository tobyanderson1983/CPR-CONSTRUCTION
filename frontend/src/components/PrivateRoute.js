// //PrivateRoute.js

import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token"); // Check authentication
  const role = localStorage.getItem("role");   // Check user's role
  const location = useLocation();
  const navigate = useNavigate();

  if (!token) {
    // Remove all history state to prevent back navigation
    window.history.replaceState(null, "", "/");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(role)) {
    // Remove all history state before redirecting to home
    window.history.replaceState(null, "", "/");
    navigate("/");
    return null;
  }

  return children;
};

export default PrivateRoute;
