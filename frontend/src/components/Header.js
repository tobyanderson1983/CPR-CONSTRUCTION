
// import React from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import './css/Header.css';

// function Header() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const user = JSON.parse(localStorage.getItem('user'));
//   const isLoggedIn = !!user;
//   const isAdmin = user?.role === 'admin';
//   const onAdminDashboard = location.pathname === '/adminDashboard';

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     window.dispatchEvent(new Event("storage"));
//     navigate('/');
//   };

//   const handleGoToDashboard = () => {
//     navigate('/adminDashboard', {
//       state: { firstName: user?.firstName, lastName: user?.lastName }
//     });
//   };

//   return (
//     <div>
//       <header>
//         <h1 className="logo">
//           <span className="cpr">CPR</span>
//           <span className="construction">CONSTRUCTION</span>
//         </h1>
//         <div>
//           <nav>
//             {/* Admin Dashboard button */}
//             {isLoggedIn && isAdmin && !onAdminDashboard && (
//               <button onClick={handleGoToDashboard} className="admin-button">
//                 Admin Dash
//               </button>
//             )}

//             {/* Nav Links */}
//             <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
//             <Link to="/services" className={location.pathname === "/services" ? "active" : ""}>Services</Link>
//             <Link to="/portfolio" className={location.pathname === "/portfolio" ? "active" : ""}>Portfolio</Link>
//             <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>Contact Us</Link>

//             {/* Logout button */}
//             {isLoggedIn && (
//               <button onClick={handleLogout} className="logout-button">Log Out</button>
//             )}
//           </nav>
//         </div>
//       </header>
//     </div>
//   );
// }

// export default Header;
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
      if (menuOpen && navRef.current && !navRef.current.contains(e.target)) {
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

      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>

      <nav ref={navRef} className={menuOpen ? 'nav open' : 'nav'}>
        {isLoggedIn && isAdmin && !onAdminDashboard && (
          <button onClick={handleGoToDashboard} className="admin-button">
            Admin Dash
          </button>
        )}

        <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
        <Link to="/services" className={location.pathname === "/services" ? "active" : ""}>Services</Link>
        <Link to="/portfolio" className={location.pathname === "/portfolio" ? "active" : ""}>Portfolio</Link>
        <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>Contact Us</Link>

        {isLoggedIn && (
          <button onClick={handleLogout} className="logout-button">Log Out</button>
        )}
      </nav>
    </header>
  );
}

export default Header;

