//ShowAllEmployees.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ShowAllEmployees = ({ data }) => {
    const [employees, setEmployees] = useState([]);
    const [page, setPage] = useState(1);
    const [totalEmployees, setTotalEmployees] = useState(0);
    const limit = 5;
    const navigate = useNavigate();
    const location = useLocation();
    
    const fetchEmployees = async (pageNum) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/employees?page=${pageNum}&limit=${limit}`);
            if (pageNum === 1) {
                setEmployees(res.data.employees);
            } else {
                setEmployees(prevEmployees => [...prevEmployees, ...res.data.employees]);
            }
            setTotalEmployees(res.data.totalEmployees);
        } catch (error) {
            console.error('Error fetching employee requests:', error);
        }
    };

    useEffect(() => {
        if (data.source === 'search') { 
            const searchResults = Array.isArray(data.list) ? data.list : [data.list];
            setEmployees(searchResults);
            setTotalEmployees(searchResults.length);
        } else {
            const shouldUsePassedData = data && Array.isArray(data) && data.length > 0;
            if (shouldUsePassedData) {
                setEmployees(data);
                setTotalEmployees(data.length);
            } else {
                fetchEmployees(page);
            }
        }
    }, [data, page, location.state?.updated]);
    

    const handleEdit = (employee) => {
       navigate(`/employee/${employee._id}`, { state: { employee } });
    };

    const handleDelete = async (employeeId) => {
        try {
            await axios.delete(`http://localhost:5000/api/employees/${employeeId}`);

            setEmployees(employees.filter(employee => employee._id !== employeeId));
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };

    return (
        <div>
            <h1>Show All Employees</h1>
            {employees.length === 0 ? (
                <p>No employees requests found.</p>
            ) : (
                <ul>
                    {employees.map((employee) => (
                        <div key={employee._id}>
                           <strong>Name:</strong> {employee.firstName} {employee.lastName}<br />
                            <strong>Phone Number:</strong> {employee.phoneNumber} <br />
                            <strong>Address:</strong> {employee.streetAddress}, {employee.state} {employee.zipCode}<br />
                            <strong>email:</strong> {employee.username}<br />
                            <button onClick={() => handleEdit(employee)}>Edit</button>
                            <button onClick={() => handleDelete(employee._id)}>Delete</button>
                            <hr />
                        </div>
                    ))}
                </ul>
            )}

            {employees.length < totalEmployees && (
                <button onClick={() => setPage(page + 1)}>Load More</button>
            )}
        </div>
    );
};

export default ShowAllEmployees;
