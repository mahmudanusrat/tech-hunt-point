import React from 'react';
import PropTypes from "prop-types";
import { FaFlag, FaThumbsUp } from 'react-icons/fa';

const Button = ({ action = null, onClick, disabled, variant = "vote" }) => {
    const renderIcon = () => {
        if (variant === "vote") return <FaThumbsUp />;
        if (variant === "report") return <FaFlag />;
        return null;
      };

      const getClassNames = () => {
        if (disabled) {
          return "bg-gray-300 text-gray-500 cursor-not-allowed";
        }
        return variant === "vote"
          ? "bg-transparent border-2 border-[#003a43]  rounded-full font-semibold hover:bg-[#b5dad3] transition duration-300"
          : "bg-red-500  px-3 py-3 rounded-full text-white hover:bg-red-600 font-semibold";
      };
              
      return (
        <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 px-2 py-2 text-sm font-medium rounded ${getClassNames()}`}
    >
      {renderIcon()}
      {action && <span>{action}</span>} {/* Conditionally render text */}
    
    </button>
      );
    };
    Button.propTypes = {
        action: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        onClick: PropTypes.func.isRequired,
        disabled: PropTypes.bool,
        variant: PropTypes.oneOf(["vote", "report"]),
      };
      
export default Button;