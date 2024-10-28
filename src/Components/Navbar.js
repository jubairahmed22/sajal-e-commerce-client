import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import "./navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const [cart, setCart] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // Set initial cart state from localStorage
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);

    // Listen for changes across tabs/windows
    const handleStorageChange = (event) => {
      if (event.key === "cart") {
        const updatedCart = JSON.parse(event.newValue) || [];
        setCart(updatedCart);
      }
    };
    window.addEventListener("storage", handleStorageChange);

    // Timer to update cart every second
    const intervalId = setInterval(() => {
      const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(updatedCart);
    }, 1000);

    // Cleanup both interval and event listener on unmount
    return () => {
      clearInterval(intervalId);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  const isActive = (path) => location.pathname === path;

  return (
    <nav class="bg-white dark:bg-gray-900 sticky w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            class="h-8"
            alt="Flowbite Logo"
          />
          <span class="self-center font-courierPrime text-2xl font-semibold whitespace-nowrap dark:text-white">
            SAGOR
          </span>
        </Link>
        {
          user ? 
          <div class="flex gap-4 lg:order-2 space-x-2 lg:space-x-0 rtl:space-x-reverse">
          <Link
            to="/dashboard"
            class="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Dashboard
          </Link>
         
        </div>
        :
        <div class="flex gap-4 lg:order-2 space-x-2 lg:space-x-0 rtl:space-x-reverse">
        <Link
          to="login"
          class="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Log In
        </Link>
        <Link
          to="signUp"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Sign Up
        </Link>
      </div>
        }
        
       
        <div
          class="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1"
          id="navbar-sticky"
        >
          <ul class="flex flex-col p-4 lg:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/"
                className={`block py-2 px-3 rounded ${
                  isActive("/")
                    ? "text-blue-700 font-bold"
                    : "text-gray-900 lg:hover:text-blue-700"
                } hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent`}
                aria-current="page"
              >
                Home
              </Link>
            </li>
        
            <li>
              <Link
                to="/contact"
                className={`block py-2 px-3 rounded ${
                  isActive("/contact")
                    ? "text-blue-700 font-bold"
                    : "text-gray-900 lg:hover:text-blue-700"
                } hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent`}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`block py-2 px-3 rounded ${
                  isActive("/about")
                    ? "text-blue-700 font-bold"
                    : "text-gray-900 lg:hover:text-blue-700"
                } hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className={`block py-2 px-3 rounded ${
                  isActive("/cart")
                    ? "text-blue-700 font-bold"
                    : "text-gray-900 lg:hover:text-blue-700"
                } hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent`}
              >
                Cart <span className="font-bold">{cart.length}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
