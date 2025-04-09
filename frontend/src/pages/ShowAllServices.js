//ShowAllServices.js

import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ShowAllServices = ({ data }) => {
    const [services, setServices] = useState([]);
    const [page, setPage] = useState(1);
    const [totalServices, setTotalServices] = useState(0);
    const limit = 5;
    const navigate = useNavigate();
    const location = useLocation();

    const fetchServices = async (pageNum) => {
        if(!data.firstName){
            try {
                const res = await axios.get(`http://localhost:5000/api/customers?page=${pageNum}&limit=${limit}`);
                if (pageNum === 1) {
                    setServices(res.data.services);
                } else {
                    setServices(prevServices => [...prevServices, ...res.data.services]);
                }
                setTotalServices(res.data.totalServices);
            } catch (error) {
                console.error('Error fetching service requests:', error);
            }
        }else{
            setServices([data]);
        }
        
    };

    useEffect(() => {
        const shouldUsePassedData = data && data.length > 0;

        if (shouldUsePassedData) {
            setServices(data);
            setTotalServices(data.length);
        } else {
            fetchServices(page);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, page, location.state?.updated]);

    const handleEdit = (service) => {
        navigate(`/edit-service/${service._id}`, { state: { service } });
    };

    const handleDelete = async (serviceId) => {
        try {
            await axios.delete(`http://localhost:5000/api/customers/service/${serviceId}`);
            setServices(services.filter(service => service._id !== serviceId));
        } catch (error) {
            console.error("Error deleting service:", error);
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
                            <button onClick={() => handleEdit(service)}>Edit</button>
                            <button onClick={() => handleDelete(service._id)}>Delete</button>
                            <hr />
                        </li>
                    ))}
                </ul>
            )}

            {services.length < totalServices && (
                <button onClick={() => setPage(page + 1)}>Load More</button>
            )}
        </div>
    );
};

export default ShowAllServices;
