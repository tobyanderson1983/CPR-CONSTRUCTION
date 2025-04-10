import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import ContactUs from "./pages/ContactUs";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import EditService from "./pages/EditService"; 
// import EditAdmin from "./pages/EditAdmin";
import Administrator from "./pages/Administrator";
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
      // {
      //   path: "/edit-admin/:id",
      //   element: (
      //     <PrivateRoute allowedRoles={["admin"]}>
      //       <EditAdmin />
      //     </PrivateRoute>
      //   ),
      // },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
