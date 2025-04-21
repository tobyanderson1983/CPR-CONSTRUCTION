
import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/basicPages/Home";
import Services from "./pages/basicPages/Services";
import Portfolio from "./pages/basicPages/Portfolio";
import ContactUs from "./pages/basicPages/ContactUs";
import AdminDashboard from "./pages/adminDashboard/AdminDashboard";
import EmployeeDashboard from "./pages/employeeDashboard/EmployeeDashboard";
import CustomerDashboard from "./pages/customerDashboard/CustomerDashboard";
import Administrator from "./pages/adminDashboard/admin/Administrator";
import Employee from "./pages/adminDashboard/employee/Employee";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import axios from 'axios';

const Layout = () => (
  <div
    style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
                        url('https://www.zadinteriors.com/blog/wp-content/uploads/2020/10/old-home-renovation.jpg')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      minHeight: "100vh",
      width: "100vw",
    }}
  >
    <Header />
    <Outlet />
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/services", element: <Services /> },
      { path: "/portfolio", element: <Portfolio /> },
      { path: "/contact", element: <ContactUs /> },

      {
        path: "/adminDashboard",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/employeeDashboard",
        element: (
          <PrivateRoute allowedRoles={["employee"]}>
            <EmployeeDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/customerDashboard",
        element: (
          <PrivateRoute allowedRoles={["customer"]}>
            <CustomerDashboard />
          </PrivateRoute>
        ),
      },
    
      {
        path: "/employee/:id",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            <Employee
              onSubmit={async (formData) => {
                try {
                  if (formData._id) {
                    await axios.put(`http://localhost:5000/api/employees/${formData._id}`, formData);
                    alert('Employee updated successfully!');
                  } else {
                    await axios.post('http://localhost:5000/api/employees', formData);
                    alert('Employee created successfully!');
                  }
                } catch (error) {
                  console.error('Failed to submit employee data:', error);
                  alert('Error occurred during submit.');
                }
              }}
            />
          </PrivateRoute>
        ),
      },
      {
        path: "/administrator/:id",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            <Administrator
              onSubmit={async (formData) => {
                try {
                  if (formData._id) {
                    await axios.put(`http://localhost:5000/api/admins/${formData._id}`, formData);
                    alert('Administrator updated successfully!');
                  } else {
                    await axios.post('http://localhost:5000/api/admins', formData);
                    alert('Administrator created successfully!');
                  }
                } catch (error) {
                  console.error('Failed to submit administrator data:', error);
                  alert('Error occurred during submit.');
                }
              }}
            />
          </PrivateRoute>
        ),
      },
      {
        path: "/service/:id",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            <Services
              isAdminView={true}
              onSubmit={async (formData) => {
                try {
                  const { _id, ...dataToSend } = formData;
                  const formPayload = new FormData();
                  Object.entries(dataToSend).forEach(([key, value]) => {
                    formPayload.append(key, value);
                  });
                  formPayload.append("role", "admin");

                  if (_id) {
                    await axios.put(`http://localhost:5000/api/customers/${_id}`, formData);
                    alert("Service updated successfully!");
                  } else {
                    await axios.post("http://localhost:5000/api/customers/", formPayload, {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    });
                    alert("Service created successfully!");
                  }
                } catch (err) {
                  console.error("Error submitting service request:", err);
                  alert("Failed to submit service request.");
                }
              }}
            />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
