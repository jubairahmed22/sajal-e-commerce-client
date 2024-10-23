// Dropdown.js
import React from "react";
import { Link } from "react-router-dom";
import "./Dropdown.css"; // Assuming you have the CSS in Dropdown.css

const Dropdown = ({ isVisible, links }) => {
  return (
    <div className={`dropdown-menu ${isVisible ? 'visible' : ''}`}>
      {links.map((link, index) => (
        <Link key={index} to={link.path} className="dropdown-item">
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default Dropdown;
