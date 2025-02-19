import React from "react";
import Navbar from "../components/Shared/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Shared/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="bg-white w-full mx-auto">
       <Navbar></Navbar>
       <div className="pt-28 min-h-[calc(100vh-68px)] dark:bg-[#303030] dark:text-white">
          <Outlet />
        </div>
        <Footer></Footer>
    </div>
  );
};

export default MainLayout;
