//Home.js

import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './css/Home.css';

function Home(){

  return (
    <div className="home-container">
    <section className="home-content">
        <h2>Your One-Stop Solution for Services</h2>
        <p>
            We provide top-notch services to meet your needs. Browse our portfolio and contact us for more details.
        </p>
        
        <Link to="/services" className="explore-btn" >Explore Services</Link>
    </section>
</div>
  );
};

export default Home;
