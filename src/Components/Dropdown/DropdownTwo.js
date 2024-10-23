// Dropdown.js
import React from "react";
import { Link } from "react-router-dom";
import "./Dropdown.css"; // Assuming you have the CSS in Dropdown.css

const DropdownTwo = ({ isVisible, links }) => {
  return (
    <div className={`responsive-menu ${isVisible ? 'visible' : ''}`}>
      {links.map((link, index) => (
        <Link key={index} to={link.path} className="responsive-item text-sm font-roboto">
          {link.label}
        </Link>
      ))}
    </div>
);
};

export default DropdownTwo;
