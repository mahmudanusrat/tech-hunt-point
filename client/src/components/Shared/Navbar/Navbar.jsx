import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import avatarImg from "../../../assets/placeholder.jpg";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../assets/logo.png";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" z-10 py-4 px-2 border-b-[1px]">
      <div className="flex flex-row items-center justify-between ">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} className="w-12 h-12" alt="" />
          <h2 className="text-xl font-bold text-[#003a43]">Tech Hunt Point</h2>
        </Link>
        {/* Navigation Links */}
        <div className="flex items-center space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-md font-medium transition ${
                isActive ? "text-[#ff8d6e]" : "text-[#003a43]"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `text-md font-medium transition ${
                isActive ? "text-[#ff8d6e]" : "text-[#003a43]"
              }`
            }
          >
            Products
          </NavLink>
          {user ? (
            <div className="relative">
              {/* User Profile Dropdown */}
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center cursor-pointer"
              >
                <img
                  src={user.photoURL || avatarImg}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border"
                />
              </div>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md">
                  <div className="p-2">
                    <p className="text-md font-bold text-[#003a43]">
                      {user.displayName}
                    </p>
                  </div>
                  <NavLink
                    to="/dashboard"
                    className="block p-2 font-medium text-md text-[#003a43] hover:bg-[#ff8d6e]"
                  >
                    Dashboard
                  </NavLink>
                  <button
                    onClick={logOut}
                    className="block w-full font-medium text-left p-2 text-md text-[#003a43] hover:bg-[#ff8d6e]"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `text-md font-medium transition ${
                    isActive ? "text-[#ff8d6e]" : "text-[#003a43]"
                  }`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `text-md font-medium transition ${
                    isActive ? "text-[#ff8d6e]" : "text-[#003a43]"
                  }`
                }
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
