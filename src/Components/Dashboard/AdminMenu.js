import { FingerPrintIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <NavLink
        to="admin-dashboard"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform   hover:bg-gray-300   hover:text-gray-900 ${
            isActive
              ? "text-gray-900  border-l-2 border-gray-900"
              : "text-gray-700"
          }`
        }a
      >
        <span className="mx-4 font-medium">Dashboard</span>
      </NavLink>
      <NavLink
        to="my-product"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform   hover:bg-gray-300   hover:text-gray-900 ${
            isActive
              ? "text-gray-900  border-l-2 border-gray-900"
              : "text-gray-700"
          }`
        }
      >
        <span className="mx-4 font-medium">My Products</span>
      </NavLink>
      <NavLink
        to="add-product"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform   hover:bg-gray-300   hover:text-gray-900 ${
            isActive
              ? "text-gray-900  border-l-2 border-gray-900"
              : "text-gray-700"
          }`
        }
      >
        <span className="mx-4 font-medium">Add Products</span>
      </NavLink>
      <NavLink
        to="orders"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform   hover:bg-gray-300   hover:text-gray-900 ${
            isActive
              ? "text-gray-900  border-l-2 border-gray-900"
              : "text-gray-700"
          }`
        }
      >
        <span className="mx-4 font-medium">Orders</span>
      </NavLink>
      <NavLink
        to="all-users"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform   hover:bg-gray-300   hover:text-gray-900 ${
            isActive
              ? "text-gray-900  border-l-2 border-gray-900"
              : "text-gray-700"
          }`
        }
      >
        <span className="mx-4 font-medium">All Users</span>
      </NavLink>
    </>
  );
};

export default AdminMenu;
