import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom"; 

const Layout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <Outlet /> {/* This will render the child components */}
      </div>
    </div>
  );
};

export default Layout;
