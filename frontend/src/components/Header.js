
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './css/Header.css';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

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

  const toggleMenu = () => setMenuOpen(prev => !prev);

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      const hamburger = document.querySelector('.hamburger');
      if (
        menuOpen && 
        navRef.current && 
        !navRef.current.contains(e.target)&&
        !hamburger.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  return (
    <header>
      <h1 className="logo">
        <span className="cpr">CPR</span>
        <span className="construction">CONSTRUCTION</span>
      </h1>

      <button
        className="hamburger"
        onClick={toggleMenu}
        aria-expanded={menuOpen}
        aria-label="Toggle navigation menu"
      >
        ☰
      </button>


      <nav ref={navRef} className={menuOpen ? 'nav open' : 'nav'}>
        {isLoggedIn && isAdmin && !onAdminDashboard && (
          <button onClick={() => { setMenuOpen(false); handleGoToDashboard(); }} className="admin-button">
            Admin Dash
          </button>
        )}

      <Link to="/" onClick={() => setMenuOpen(false)} className={location.pathname === "/" ? "active" : ""}>Home</Link>
      <Link to="/services" onClick={() => setMenuOpen(false)} className={location.pathname === "/services" ? "active" : ""}>Services</Link>
      <Link to="/portfolio" onClick={() => setMenuOpen(false)} className={location.pathname === "/portfolio" ? "active" : ""}>Portfolio</Link>
      <Link to="/contact" onClick={() => setMenuOpen(false)} className={location.pathname === "/contact" ? "active" : ""}>Contact Us</Link>
      {/* <Link to="/about" onClick={() => setMenuOpen(false)} className={location.pathname === "/about" ? "active" : ""}>About Us</Link> */}

        {isLoggedIn && (
          <button onClick={() => { setMenuOpen(false); handleLogout(); }} className="logout-button">
            Log Out
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;

