
// import axios from 'axios';

// export const handleCreateAdmin = async (adminData, setView) => {
//     console.log(adminData)
//   try {
//     const token = localStorage.getItem('token');
//     await axios.post('http://localhost:5000/api/admins/', adminData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     alert('Admin created successfully!');
//     setView(null);
//   } catch (error) {
//     console.error('Error creating admin:', error);
//     alert('Failed to create admin.');
//   }
// };


// export const handleSearchAdmin = async ({ username, firstName, lastName, setAdmins, setView }) => {
//   try {
//     const token = localStorage.getItem('token');
//     const queryParams = new URLSearchParams();

//     if (username) queryParams.append('username', username);
//     else if (firstName && lastName) {
//       queryParams.append('firstName', firstName);
//       queryParams.append('lastName', lastName);
//     }

//     const response = await axios.get(
//       `http://localhost:5000/api/admins/oneAdmin?${queryParams.toString()}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     // if response is a single admin, wrap in array. if array, use as is
//     const admins = Array.isArray(response.data.admin)
//       ? response.data.admin
//       : response.data.admin
//       ? [response.data.admin]
//       : [];

//     setAdmins({
//       list: admins,
//       source: 'search',
//     });

//     setView('showAllAdmins');
//   } catch (error) {
//     console.error('Error searching admin:', error);
//     alert('Failed to search admin. Check input and try again.');
//   }
// };

// src/components/admin/utils/adminHandlers.js
import axios from 'axios';

// Handle creating an admin
export const handleCreateAdmin = async (adminData, setView) => {
  try {
    await axios.post('http://localhost:5000/api/admins/', adminData);
    alert('Administrator created successfully!');
    setView(null);  // Close the form
  } catch (error) {
    console.error('Error creating admin:', error);
    alert('Failed to create administrator.');
  }
};

// Handle searching for an admin
export const handleSearchAdmin = async (username, firstName, lastName, setAdmins, setView) => {
  try {
    const token = localStorage.getItem("token");
    const queryParams = new URLSearchParams();

    if (username) queryParams.append('username', username);
    else if (firstName && lastName) {
      queryParams.append('firstName', firstName);
      queryParams.append('lastName', lastName);
    }
  
    const res = await axios.get(`http://localhost:5000/api/admins/oneAdmin?${queryParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setAdmins({
      list: res.data.admin || [],
      source: 'search',
    });

    setView('showAllAdmins');
  } catch (error) {
    console.error('Error fetching admins:', error);
    alert('Could not find admin. Check your input and try again.');
  }
};
