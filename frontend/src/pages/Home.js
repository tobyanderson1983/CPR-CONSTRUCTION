//Home.js

import React from 'react';
import LogIn from './../components/LogIn.js';
//import { Link } from 'react-router-dom';
import './css/Home.css';

function Home(){

  return (
    <div className="home-container">
    <section className="home-content">
        <h2>We Breathe Life Back into Your <span>HOME</span>.</h2>
        <LogIn  />

       {/* <Link to="/services" className="explore-btn" >Explore Services</Link> */}
    </section>
</div>
  );
};

export default Home;
