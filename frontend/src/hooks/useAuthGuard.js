import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const useAuthGuard = (requiredRole) => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.role;

    
    if (!token || role !== requiredRole) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      setAuthorized(false);
      navigate('/'); // redirect
    } else {
      setAuthorized(true);
    }
  }, [navigate, requiredRole, location]); // <<< IMPORTANT: DEPEND ON LOCATION!

  return authorized;
};

export default useAuthGuard;
