//ShowAllServices.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShowAllServices = () => {
    const [services, setServices] = useState([]); // Store fetched services
    const [page, setPage] = useState(1); // Track current page
    const [totalServices, setTotalServices] = useState(0); // Store total number of services
    const limit = 5; // Number of services per page

    useEffect(() => {
        fetchServices(page);
    }, [page]); // Re-fetch when page changes

    const fetchServices = async (pageNum) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/auth/services?page=${pageNum}&limit=${limit}`);
            console.log(res.data); // Debugging: Check if pagination works

            if (pageNum === 1) {
                setServices(res.data.services); // First page replaces list
            } else {
                setServices(prevServices => [...prevServices, ...res.data.services]); // Append new data
            }

            setTotalServices(res.data.totalServices); // Store total count for button logic

        } catch (error) {
            console.error('Error fetching service requests:', error);
            alert('Failed to fetch services.');
        }
    };

    return (
        <div>
            <h1>Show All Services</h1>
            {services.length === 0 ? (
                <p>No service requests found.</p>
            ) : (
                <ul>
                    {services.map((service) => (
                        <li key={service._id}>
                            <strong>Customer:</strong> {service.firstName} {service.lastName} <br />
                            <strong>Service Type:</strong> {service.serviceType} <br />
                            <strong>Description:</strong> {service.description} <br />
                            <strong>Status:</strong> {service.status} <br />
                            <strong>Role:</strong> {service.role} <br />
                            <strong>Date Requested:</strong> {new Date(service.dateRequested).toLocaleString()} <br />
                            <hr />
                        </li>
                    ))}
                </ul>
            )}

            {/* "Load More" Button */}
            {services.length < totalServices && (
                <button onClick={() => setPage(page + 1)}>Load More</button>
            )}
        </div>
    );
};

export default ShowAllServices;
