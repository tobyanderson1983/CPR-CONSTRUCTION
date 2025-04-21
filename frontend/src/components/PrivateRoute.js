import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
  const [isReady, setIsReady] = useState(false); // Wait until localStorage is available
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) {
      setUser({ token, role });
    }
    setIsReady(true); // After checking localStorage
  }, []);

  if (!isReady) return null; // Or a loading spinner

  if (!user?.token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    window.history.replaceState(null, "", "/");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
