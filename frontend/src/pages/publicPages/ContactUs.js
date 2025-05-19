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
  // use axios instead of fetch for better error handling and request cancellation
  /*
  useEffect(() => {
    fetch('http://localhost:5000/api/contact')
      .then(response => response.json())
      .then(data => setContactInfo(data))
      .catch(error => console.error('Error fetching contact info:', error));
  }, []);
  */

  // return (
  //   <div className="contact-container">
  //     <h1>Contact Us</h1>
  //     <div className="contact-details">
  //       <p><strong>Name:</strong> {contactInfo.name}</p>
  //       <p><strong>Phone:</strong> <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a></p>
  //       <p><strong>Email:</strong> <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></p>
  //       <p><strong>Address:</strong> {contactInfo.address}</p>
  //     </div>
  //   </div>
  // );
  return (
  <section className="contact-container" aria-labelledby="contact-heading">
    <h1 id="contact-heading">Contact Us</h1>
    {contactInfo && (
      <div className="contact-details">
        <p aria-label="Name"> <strong>{contactInfo.name}</strong></p>
        <p aria-label="Phone"> <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a></p>
        <p>
          <a href={`mailto:${contactInfo.email}`} aria-label={`Email address ${contactInfo.email}`}>
            {contactInfo.email}
          </a>
        </p>
        <p aria-label="Adderss"><br />{contactInfo.address}</p>
      </div>
    )}
  </section>
);

};

export default ContactUs;
