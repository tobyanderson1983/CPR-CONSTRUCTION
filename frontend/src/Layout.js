
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAutoLogoutWithWarning from "./pages/hooks/useAutoLogoutWithWarning";
import Header from "./components/Header";

const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
   
    localStorage.removeItem("token");  // Clear user session data
    localStorage.removeItem('user');
    window.dispatchEvent(new Event("storage"));
   
    navigate("/"); // Redirect to homepage or login
  };

  const { showWarning, dismissWarning } = useAutoLogoutWithWarning({
    // warningTime: 60 * 1000,     // 1 minute before logout
    // logoutTime: 5 * 60 * 1000,  // total 5 minutes of inactivity
    warningTime: 10 * 1000,     // 1 minute before logout
    logoutTime: 1 * 60 * 1000,  // total 5 minutes of inactivity
    onLogout: handleLogout,
  });

  return (
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

      {showWarning && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <p>You will be logged out in 1 minute due to inactivity.</p>
            <button onClick={dismissWarning}>Stay Logged In</button>
          </div>
        </div>
      )}
    </div>
  );
};

const modalStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  height: "100vh",
  width: "100vw",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContentStyle = {
  background: "white",
  padding: "2rem",
  borderRadius: "8px",
  textAlign: "center",
  boxShadow: "0 0 10px rgba(0,0,0,0.25)",
};

export default Layout;
