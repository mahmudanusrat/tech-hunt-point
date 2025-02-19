import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Link as ScrollLink } from 'react-scroll';

import avatarImg from "../../../assets/placeholder.jpg";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../assets/logo.png";
import { FiMenu, FiX } from "react-icons/fi";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
 
  // Check the local storage on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newMode;
    });
  };

  return (
    <nav className="w-full fixed top-0 left-0 shadow-md z-50 bg-white dark:bg-[#303030] border-b-[1px]">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} className="w-12 h-12" alt="Logo" />
          <h2 className="text-xl font-bold text-[#003a43] dark:text-white">
            Tech Hunt Point
          </h2>
        </Link>

        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        <div
          className={`absolute md:static top-16 left-0 w-full bg-white dark:bg-[#303030] md:flex md:items-center md:space-x-4 md:w-auto transition-transform ${
            menuOpen ? "block" : "hidden"
          } md:block`}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block md:inline text-md font-medium transition p-2 md:p-0 ${
                isActive
                  ? "text-[#ff8d6e]"
                  : "text-[#003a43] dark:text-white"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `block md:inline text-md font-medium transition p-2 md:p-0 ${
                isActive
                  ? "text-[#ff8d6e]"
                  : "text-[#003a43] dark:text-white"
              }`
            }
          >
            Products
          </NavLink>
          <ScrollLink
          to="trending-products"
          smooth={true}
          duration={500}
          className="cursor-pointer block md:inline text-md font-medium transition p-2 md:p-0 text-[#003a43] dark:text-white"
        >
          Trending Products
        </ScrollLink>
          <ScrollLink
          to="faq"
          smooth={true}
          duration={500}
          className="cursor-pointer block md:inline text-md font-medium transition p-2 md:p-0 text-[#003a43] dark:text-white"
        >
          FAQ
        </ScrollLink>



          {user ? (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `block md:inline text-md font-medium transition p-2 md:p-0 ${
                    isActive
                      ? "text-[#ff8d6e]"
                      : "text-[#003a43] dark:text-white"
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
                    isActive
                      ? "text-[#ff8d6e]"
                      : "text-[#003a43] dark:text-white"
                  }`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `block md:inline text-md font-medium transition p-2 md:p-0 ${
                    isActive
                      ? "text-[#ff8d6e]"
                      : "text-[#003a43] dark:text-white"
                  }`
                }
              >
                Register
              </NavLink>
            </>
          )}
          <div className="flex items-center ml-4">
            <DarkModeSwitch
              checked={isDarkMode}
              onChange={toggleDarkMode}
              size={24}
              sunColor="#FFA500"
              moonColor="#4A5568"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
