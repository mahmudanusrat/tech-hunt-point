import React from "react";
import Navbar from "../components/Shared/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Shared/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="bg-white">
      <div className=" max-w-screen-xl mx-auto">
      <Navbar></Navbar>
      <div className="pt-28 min-h-[calc(100vh-68px)]">
        <Outlet />
      </div>
      <Footer></Footer>
        </div>
    </div>
  );
};

export default MainLayout;
