//CustomerDashboard

// import React , { useEffect, useState } from 'react';
// import { useLocation } from "react-router-dom";
// import axios from 'axios';

// const CustomerDashboard = () => {
//   const [services, setServices] = useState([]);
//   const token = localStorage.getItem('token');
//   const location = useLocation();
  //const userData = location.state; //this was already not being used before icommented everything
  //const userName = location.state?.username || "Guest";

  //console.log(userName);
  //console.log(location.state.username)


  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await axios.get('http://localhost:5000/api/auth/customerDashboard', {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setServices(response.data.services);
  //   };
  //   fetchData();
  // }, [token]);

//   return (
//     <div>
//       <h2>Welcome {userName}</h2>
//       <h3>Your Service Requests:</h3>
//       <ul>
//         {services.map((service, index) => (
//           <li key={index}>
//             {service.name} - {service.status}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CustomerDashboard;

// EmployeeDashboard.js

import React from 'react';
import { useLocation } from 'react-router-dom';

const CustomerDashboard = () => {
    const location = useLocation(); // ✅ Get location from React Router
    const fullName = `${location.state?.firstName || "Guest"} ${location.state?.lastName || ""}`.trim();

    return (
        <div>
            <h1>Welcome to your employee dashboard, {fullName}!</h1>
        </div>
    );
}

export default CustomerDashboard;
