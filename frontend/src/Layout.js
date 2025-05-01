// src/Layout.js

import React from "react";
import { Outlet } from "react-router-dom";
import useAutoLogoutWithWarning from "./pages/hooks/useAutoLogoutWithWarning";
import Header from "./components/Header";

const Layout = () => {
  useAutoLogoutWithWarning({ timeout: 60000, warningTime: 10000 });

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
    </div>
  );
};

export default Layout;
