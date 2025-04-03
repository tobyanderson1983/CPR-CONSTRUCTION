import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const EditService = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const service = location.state?.service; // Get service data from navigation state

    // Initialize form data with existing service details
    const [formData, setFormData] = useState({
        serviceType: service?.serviceType || "",
        description: service?.description || "",
        status: service?.status || "",
    });

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/auth/services/${service._id}`, formData);
            alert("Service updated successfully!");
            navigate("/adminDashboard", { state: { updated: true } }); // Navigate back to refresh services
        } catch (error) {
            console.error("Error updating service:", error);
            alert("Failed to update service.");
        }
    };

    if (!service) {
        return <p>Service not found!</p>; // Handle case where no service data is available
    }

    return (
        <div>
            <h2>Edit Service</h2>
            <form onSubmit={handleSubmit}>
                <label>Service Type:</label>
                <input type="text" name="serviceType" value={formData.serviceType} onChange={handleChange} required />

                <label>Description:</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required></textarea>

                <label>Status:</label>
                <select name="status" value={formData.status} onChange={handleChange}>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>

                <button type="submit">Update</button>
                <button type="button" onClick={() => navigate("/adminDashboard")}>Cancel</button>
            </form>
        </div>
    );
};

export default EditService;
