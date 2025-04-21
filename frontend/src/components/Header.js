// Header.js
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './css/Header.css';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user?.role === 'admin';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.history.replaceState(null, '', '/');
    navigate('/');
  };

  // Check if admin is editing/creating a service
  const isAdminEditingService = isAdmin && location.pathname.startsWith('/service');

  // General private route check (admin/employee access)
  const isPrivateRoute =
    location.pathname.startsWith('/adminDashboard') ||
    location.pathname.startsWith('/employeeDashboard') ||
    location.pathname.startsWith('/serviceDashboard') ||
    location.pathname.startsWith('/administrator') ||
    location.pathname.startsWith('/employee') ||
    isAdminEditingService;

  return (
    <div>
      <header>
        <div>
          <nav>
            {isPrivateRoute ? (
              // 🔒 Private route or admin-only editing service — show only logout
              <button onClick={handleLogout} className="logout-button">Log Out</button>
            ) : (
              // 🌐 Public view — full nav
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
