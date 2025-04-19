import axios from 'axios';

export const handleSearchService = async (username, firstName, lastName, setServices, setView, setUsername, 
  setFirstName, setLastName) => {
  try {
    const token = localStorage.getItem("token");

    const queryParams = new URLSearchParams();
    if (username) queryParams.append('username', username);
    else if (firstName && lastName) {
      queryParams.append('firstName', firstName);
      queryParams.append('lastName', lastName);
    }

    const res = await axios.get(`http://localhost:5000/api/customers/oneCustomer?${queryParams.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setServices(res.data.services || []);
    setView('showAllServices');
    setUsername('');
    setFirstName('');
    setLastName('');
  } catch (error) {
    console.error('Error fetching service:', error);
    alert('Could not find service. Check your input and try again.');
  }
};

