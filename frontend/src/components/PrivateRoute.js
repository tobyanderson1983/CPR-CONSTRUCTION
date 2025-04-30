
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {

  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.role;

    if (token && role) {
      setUser({ token, role });
    }
    setIsReady(true);
  }, []);

  if (!isReady) return null; // or a loading spinner

  if (!user?.token) {
    // No token = not logged in => clear just in case
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  
  if (!allowedRoles.includes(user.role)) {
    // Role is wrong => clear storage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
