import axios from 'axios';

// CREATE EMPLOYEE
export const handleCreateEmployee = async (employeeData, setView) => {
  try {
    //------may want backend to check token validation---------
    
    const token = localStorage.getItem("token");
    await axios.post('http://localhost:5000/api/employees/', employeeData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    alert('Employee created successfully!');
    setView(null);
  } catch (error) {
    console.error('Error creating employee:', error.response?.data || error.message);
    alert(`Failed to create employee: ${error.response?.data?.message || error.message}`);
  }
};

// SEARCH EMPLOYEE
export const handleSearchEmployee = async (username, firstName, lastName, setEmployees, setView) => {
  try {
    const token = localStorage.getItem("token");
    const queryParams = new URLSearchParams();

    if (username) queryParams.append('username', username);
    else if (firstName && lastName) {
      queryParams.append('firstName', firstName);
      queryParams.append('lastName', lastName);
    }

    const res = await axios.get(
      `http://localhost:5000/api/employees/oneEmployee?${queryParams.toString()}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setEmployees({
      list: res.data.employee || [],
      source: 'search',
    });

    setView('showAllEmployees');
  } catch (error) {
    console.error('Error fetching employees:', error.response?.data || error.message);
    alert(`Could not find employee: ${error.response?.data?.message || error.message}`);
  }
};
