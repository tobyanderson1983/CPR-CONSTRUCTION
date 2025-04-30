//Header.js
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './css/Header.css';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if a user is logged in by looking for the stored user object
  const user = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = !!user;
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.dispatchEvent(new Event("storage")); // ✅ trigger update
    navigate('/');
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
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
            <Link to="/services" className={location.pathname === "/services" ? "active" : ""}>Services</Link>
            <Link to="/portfolio" className={location.pathname === "/portfolio" ? "active" : ""}>Portfolio</Link>
            <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>Contact Us</Link>
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

//===========================================================================

