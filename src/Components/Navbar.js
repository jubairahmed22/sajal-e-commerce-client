import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import "./navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="text-black body-font py-4 bg-gray-400 shadow-sm w-full">
      <div className="w-[800px] mx-auto flex justify-between items-center">
        {/* Links */}
        <div>
          <Link to="/products">Product</Link>
          <Link className="ml-5" to="/cart">
            Cart
          </Link>
        </div>
        {
          user ? <h1>{user.email}</h1> : ""
        }
        {/* User Actions */}
        <div>
          {user ? (
            // If the user is logged in, show the logout button
            <div>
               <button onClick={logout} className="ml-5 bg-red-500 text-white px-3 py-1 rounded">
              Logout
            </button>
            <Link to="/dashboard" className="ml-5 bg-green-500 text-white px-3 py-1 rounded">
            Dashboard
          </Link>
            </div>
          ) : (
            // If the user is not logged in, show the login link
            <Link to="/login" className="ml-5 bg-blue-500 text-white px-3 py-1 rounded">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
