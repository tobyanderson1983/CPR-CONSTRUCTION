import React, { useState, useEffect } from 'react';
import './css/ContactUs.css';

const ContactUs = () => {
  const [contactInfo, setContactInfo] = useState({
    name: 'CPR CONSTRUCTION, LLC',
    email: 'cprconstruction@yahoo.com',
    phone: '(206) 683-8390',
    address: '28524 Old 99 N, Stanwood, WA 98292',
  });

  // Uncomment and modify the following useEffect when ready to fetch data from the backend
  /*
  useEffect(() => {
    fetch('http://localhost:5000/api/contact')
      .then(response => response.json())
      .then(data => setContactInfo(data))
      .catch(error => console.error('Error fetching contact info:', error));
  }, []);
  */

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <div className="contact-details">
        <p><strong>Name:</strong> {contactInfo.name}</p>
        <p><strong>Phone:</strong> <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a></p>
        <p><strong>Email:</strong> <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></p>
        <p><strong>Address:</strong> {contactInfo.address}</p>
      </div>
    </div>
  );
};

export default ContactUs;
