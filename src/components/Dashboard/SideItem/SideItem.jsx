import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const SideItem = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `flex items-center px-4 py-2 my-5 text-[#f8f3eb] transition-colors duration-300 transform  hover:bg-[]  ${
          isActive ? "bg-[#5a9a8e] rounded-2xl " : " "
        }`
      }
    >
      {Icon ? <Icon className="w-5 h-5" /> : null}
      <span className="mx-4 font-medium">{label}</span>
    </NavLink>
  );
};
SideItem.propTypes = {
  label: PropTypes.string,
  address: PropTypes.string,
  icon: PropTypes.elementType,
};
export default SideItem;
