import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/basicPages/Home";
import Services from "./pages/basicPages/Services";
import Portfolio from "./pages/basicPages/Portfolio";
import ContactUs from "./pages/basicPages/ContactUs";
import AdminDashboard from "./pages/adminDashboard/AdminDashboard";
import EmployeeDashboard from "./pages/employeeDashboard/EmployeeDashboard";
import CustomerDashboard from "./pages/customerDashboard/CustomerDashboard";
import EditService from "./pages/adminDashboard/customer/EditService"; 
import Administrator from "./pages/adminDashboard/admin/Administrator";
import Employee from "./pages/adminDashboard/employee/Employee";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import axios from 'axios';

// ✅ Layout Component that includes Header
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

// ✅ Define Routes Properly
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // ✅ Wraps pages inside Layout
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
        path: "/employee/:id",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
             <Employee
                onSubmit={async (formData) => {
                  try {
                    if (formData._id) {
                      // EDIT mode
                      await axios.put(`http://localhost:5000/api/employees/${formData._id}`, formData);
                      alert('Employee updated successfully!');
                    } else {
                      // CREATE mode
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
        path: "/customerDashboard",
        element: (
          <PrivateRoute allowedRoles={["customer"]}>
            <CustomerDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-service/:id",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            <EditService />
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
                      // EDIT mode
                      await axios.put(`http://localhost:5000/api/admins/${formData._id}`, formData);
                      alert('Administrator updated successfully!');
                    } else {
                      // CREATE mode
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
