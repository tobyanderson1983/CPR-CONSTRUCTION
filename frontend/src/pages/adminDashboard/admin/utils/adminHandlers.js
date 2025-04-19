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
