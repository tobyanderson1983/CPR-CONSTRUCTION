import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";

// ✅ Layout Component that includes Header
const Layout = () => (
  <>
    <Header />  
    <Outlet /> 
  </>
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
      { path: "/dashboard", element: <PrivateRoute element={<Dashboard />} /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
