//ShowAllAdmins.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ShowAllAdmins = ({ data }) => {
    const [admins, setAdmins] = useState([]);
    const [page, setPage] = useState(1);
    const [totalAdmins, setTotalAdmins] = useState(0);
    const limit = 5;
    const navigate = useNavigate();
    const location = useLocation();
    
    const fetchAdmins = async (pageNum) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/admins?page=${pageNum}&limit=${limit}`);
            if (pageNum === 1) {
                console.log('fetch admins..res.data.admins: ', res.data.admins)
                setAdmins(res.data.admins);
            } else {
                setAdmins(prevAdmins => [...prevAdmins, ...res.data.admins]);
            }
            setTotalAdmins(res.data.totalAdmins);
        } catch (error) {
            console.error('Error fetching admin requests:', error);
        }
    };

    // useEffect(() => {
    //     if(data.source === 'search'){
    //         console.log('data.list" ', data.list)
    //         data = [data.list];
    //         console.log('data.length: ', data.length)
    //         setAdmins(data.list);
    //         console.log('admins: ', admins)
    //         console.log('data: ', data)
    //         setTotalAdmins(data.length);
    //         //lets try setAdmins() and set it to data.list as an arrary
    //        // setAdmins(data);// took out []
    //         //tell it what to do now that you know it is from the search
    //     }else{
    //         const shouldUsePassedData = data && data.length > 0;
    //         if (shouldUsePassedData) {
    //             setAdmins(data);
    //             setTotalAdmins(data.length);
    //         } else {
    //             fetchAdmins(page);
    //         }
    //     }
    // }, [data, page, location.state?.updated]);

    useEffect(() => {
        if (data.source === 'search') {
            console.log('data.list:', data.list);
            
            const searchResults = Array.isArray(data.list) ? data.list : [data.list];
            
            setAdmins(searchResults);
            setTotalAdmins(searchResults.length);
        } else {
            const shouldUsePassedData = data && Array.isArray(data) && data.length > 0;
            if (shouldUsePassedData) {
                setAdmins(data);
                setTotalAdmins(data.length);
            } else {
                fetchAdmins(page);
            }
        }
    }, [data, page, location.state?.updated]);
    

    const handleEdit = (admin) => {
        navigate(`/administrator/${admin._id}`, { state: { admin } });
    };

    const handleDelete = async (adminId) => {
        try {
            await axios.delete(`http://localhost:5000/api/admins/${adminId}`);

            setAdmins(admins.filter(admin => admin._id !== adminId));
        } catch (error) {
            console.error("Error deleting admin:", error);
        }
    };

    return (
        <div>
            <h1>Show All Administrators</h1>
            {admins.length === 0 ? (
                <p>No administrators requests found.</p>
            ) : (
                <ul>
                    {admins.map((admin) => (
                        <div key={admin._id}>
                           <strong>Name:</strong> {admin.firstName} {admin.lastName}<br />
                            <strong>Phone Number:</strong> {admin.phoneNumber} <br />
                            <strong>Address:</strong> {admin.streetAddress}, {admin.state} {admin.zipCode}<br />
                            <strong>email:</strong> {admin.username}<br />
                            <button onClick={() => handleEdit(admin)}>Edit</button>
                            <button onClick={() => handleDelete(admin._id)}>Delete</button>
                            <hr />
                        </div>
                    ))}
                </ul>
            )}

            {admins.length < totalAdmins && (
                <button onClick={() => setPage(page + 1)}>Load More</button>
            )}
        </div>
    );
};

export default ShowAllAdmins;
