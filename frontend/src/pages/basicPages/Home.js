import React, { useState } from 'react';
import LogIn from './../../components/LogIn.js';
import './css/Home.css';

function Home() {
  const [view, setView] = useState(null); // Lifted up from LogIn

  return (
    <div className="home-container">
      <section className="home-content">
        {view === null && (
          <h2>We Breathe Life Back into Your <span>HOME</span>.</h2>
        )}
        <LogIn view={view} setView={setView} />
      </section>
    </div>
  );
}

export default Home;
