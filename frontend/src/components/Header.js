//Header.js

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './css/Header.css';

function Header(){
  const location = useLocation(); // Get current route

  return(
    <div>
      <header>
      <div>
          <nav>
              <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
              <Link to="/services" className={location.pathname === "/services" ? "active" : ""}>Services</Link>
              <Link to="/portfolio" className={location.pathname === "/portfolio" ? "active" : ""}>Portfolio</Link>
              <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>Contact Us</Link>
          </nav>
        </div>
        <h1 className="logo">
          <span className="cpr">CPR</span>
          <span className="construction">CONSTRUCTION</span>
        </h1> 
      </header>
    </div>
  );
};

export default Header;
