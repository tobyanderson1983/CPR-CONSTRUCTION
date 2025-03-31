//Header.js

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './css/Header.css';

function Header() {
  const location = useLocation(); // Get current route
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove authentication token
    window.history.replaceState(null, '', '/'); // Prevent back navigation
    navigate('/'); // Redirect to home
  };

  // Define private routes
  const privateRoutes = ["/adminDashboard", "/employeeDashboard", "/serviceDashboard"];

  return (
    <div>
      <header>
        <div>
          <nav>
            {privateRoutes.includes(location.pathname) ? (
              // Show only "Log Out" if on a private route
              <button onClick={handleLogout} className="logout-button">Log Out</button>
            ) : (
              // Show full navigation for public pages
              <>
                <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
                <Link to="/services" className={location.pathname === "/services" ? "active" : ""}>Services</Link>
                <Link to="/portfolio" className={location.pathname === "/portfolio" ? "active" : ""}>Portfolio</Link>
                <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>Contact Us</Link>
              </>
            )}
          </nav>
        </div>
        <h1 className="logo">
          <span className="cpr">CPR</span>
          <span className="construction">CONSTRUCTION</span>
        </h1>
      </header>
    </div>
  );
}

export default Header;
