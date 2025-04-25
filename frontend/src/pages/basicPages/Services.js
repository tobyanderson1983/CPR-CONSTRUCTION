import React, { useState, useEffect } from 'react';
import './css/Services.css';

const Services = () => {
    const [servicesProvidedInfo, setServicesProvidedInfo] = useState([
        {
          title: "Kitchen Remodeling",
          description: "Transform your kitchen with modern fixtures, custom cabinetry, and beautiful finishes."
        },
        {
          title: "Bathroom Renovation",
          description: "Upgrade your bathroom with new tiles, efficient plumbing, and luxury features."
        },
        {
          title: "Home Additions",
          description: "Expand your living space with professionally designed and built home additions."
        },
        {
          title: "Flooring Installation",
          description: "High-quality flooring options including hardwood, laminate, and tile, installed with precision."
        },
        {
          title: "Roofing Services",
          description: "Complete roofing solutions from inspection to installation and repair."
        }
      ]);
      

  // Uncomment and modify the following useEffect when ready to fetch data from the backend
//   useEffect(() => {
//     fetch('http://localhost:5000/api/servicesProvided')
//       .then(response => response.json())
//       .then(data => setServicesProvidedInfo(data))
//       .catch(error => console.error('Error fetching service provided info:', error));
//   }, []);
  

  return (
    <div className="services-provided-container">
        <h1>Our Construction Services</h1>
        <div className="service-details">
            {servicesProvidedInfo.map((service, index) => (
            <div className="service-card" key={index}>
                <h2>{service.title}</h2>
                <p>{service.description}</p>
            </div>
            ))}
        </div>
    </div>
  );
};

export default Services;
