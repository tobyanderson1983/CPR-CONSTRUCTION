
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './css/Header.css';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = !!user;
  const isAdmin = user?.role === 'admin';
  const onAdminDashboard = location.pathname === '/adminDashboard';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.dispatchEvent(new Event("storage"));
    navigate('/');
  };

  const handleGoToDashboard = () => {
    navigate('/adminDashboard', {
      state: { firstName: user?.firstName, lastName: user?.lastName }
    });
  };

  return (
    <div>
      <header>
        <h1 className="logo">
          <span className="cpr">CPR</span>
          <span className="construction">CONSTRUCTION</span>
        </h1>
        <div>
          <nav>
            {/* Admin Dashboard button */}
            {isLoggedIn && isAdmin && !onAdminDashboard && (
              <button onClick={handleGoToDashboard} className="admin-button">
                Admin Dash
              </button>
            )}

            {/* Nav Links */}
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
            <Link to="/services" className={location.pathname === "/services" ? "active" : ""}>Services</Link>
            <Link to="/portfolio" className={location.pathname === "/portfolio" ? "active" : ""}>Portfolio</Link>
            <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>Contact Us</Link>

            {/* Logout button */}
            {isLoggedIn && (
              <button onClick={handleLogout} className="logout-button">Log Out</button>
            )}
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Header;
