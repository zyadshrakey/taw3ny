import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";

function Layout({ userData }) {
  return (
    <>
      <Navbar userData={userData} />
      <div style={{ backgroundColor: "#f4f7fb", minHeight: "90vh" }}>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
