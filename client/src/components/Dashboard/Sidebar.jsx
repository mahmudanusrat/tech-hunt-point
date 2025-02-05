import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineBars } from "react-icons/ai";
import logo from "../../assets/logo.png";

import UserSideItem from "./SideItem/UserSideItem";
import AdminSideItem from "./SideItem/AdminSideItem";
import ModeratorSideItem from "./SideItem/ModeratorSideItem";
import useRole from "../../hooks/useRole";
import { FaLongArrowAltUp } from "react-icons/fa";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setActive] = useState(false);
  const [role, isLoading] = useRole();

  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <div className="bg-[#003a43]">
      <div className="flex justify-between md:hidden items-center p-4 bg-[#003a43] shadow-lg">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="logo" width="50" height="50" />
          <span className="ml-2 text-lg font-bold">Home</span>
        </Link>
        <button
          onClick={handleToggle}
          aria-label="Toggle sidebar"
          className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f8f3eb]"
        >
          <AiOutlineBars className="w-6 h-6 text-[#f8f3eb]" />
        </button>
      </div>

      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-[#003a43] text-[#f8f3eb] w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div className="w-full hidden md:flex  shadow-lg rounded-lg  items-center  mx-auto">
          <NavLink to="/" className="flex items-center">
            <img
              className="hidden md:block"
              src={logo}
              alt="logo"
              width="60"
              height="60"
            />
            Home
          </NavLink>
        </div>
        <div className="flex flex-col justify-between flex-1">
            {role === "user" && <UserSideItem />}
            {role === "Moderator" && <ModeratorSideItem />}
            {role === "Admin" && <AdminSideItem />}
        </div>
        <div>
          <hr />
          <button
            onClick={logOut}
            className="flex w-full items-center px-4 py-2 mt-5  hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
          >
            <FaLongArrowAltUp className="w-5 h-5" />
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
