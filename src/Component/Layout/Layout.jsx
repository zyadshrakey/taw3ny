import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";

function Layout({userData}) {
  return (
    <>
      <Navbar userData={userData}/>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
