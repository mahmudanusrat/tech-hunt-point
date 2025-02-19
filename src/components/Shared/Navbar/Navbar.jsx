import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import avatarImg from "../../../assets/placeholder.jpg";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../assets/logo.png";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className=" w-full fixed top-0 left-0 shadow-md z-50 bg-white border-b-[1px]">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} className="w-12 h-12" alt="" />
          <h2 className="text-xl font-bold text-[#003a43]">Tech Hunt Point</h2>
        </Link>
        
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
        
        <div className={`absolute md:static top-16 left-0 w-full bg-white md:flex md:items-center md:space-x-4 md:w-auto transition-transform ${menuOpen ? "block" : "hidden"} md:block`}>          
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block md:inline text-md font-medium transition p-2 md:p-0 ${
                isActive ? "text-[#ff8d6e]" : "text-[#003a43]"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `block md:inline text-md font-medium transition p-2 md:p-0 ${
                isActive ? "text-[#ff8d6e]" : "text-[#003a43]"
              }`
            }
          >
            Products
          </NavLink>
          {user ? (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `block md:inline text-md font-medium transition p-2 md:p-0 ${
                    isActive ? "text-[#ff8d6e]" : "text-[#003a43]"
                  }`
                }
              >
                Dashboard
              </NavLink>
              
              <div className="relative block md:inline">
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
                    <button
                      onClick={logOut}
                      className="block w-full font-medium text-left p-2 text-md text-[#003a43] hover:bg-[#ff8d6e]"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `block md:inline text-md font-medium transition p-2 md:p-0 ${
                    isActive ? "text-[#ff8d6e]" : "text-[#003a43]"
                  }`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `block md:inline text-md font-medium transition p-2 md:p-0 ${
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
    </nav>
  );
};

export default Navbar;
