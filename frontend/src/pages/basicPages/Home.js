
import React, { useState, useEffect } from 'react';
import LogIn from './../../components/LogIn.js';
import './css/Home.css';

function Home() {
  const [view, setView] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  // This effect watches localStorage and updates the state
  useEffect(() => {
    const checkToken = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };

    // Listen for changes to localStorage (e.g. logout from another tab)
    window.addEventListener('storage', checkToken);

    // Run once on mount
    checkToken();

    return () => {
      window.removeEventListener('storage', checkToken);
    };
  }, []);

  return (
    <div className="home-container">
      <section className="home-content">
        {!isLoggedIn && view === null && (
          <h2>We Breathe Life Back into Your <span>HOME</span>.</h2>
        )}

        {!isLoggedIn && (
          <LogIn view={view} setView={setView} />
        )}
         {isLoggedIn && (
            <h2>Welcome Back to <span>CPR Construction</span>!</h2>
        )}
      </section>
    </div>
  );
}

export default Home;

