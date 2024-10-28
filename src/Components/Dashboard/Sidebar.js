import React, { useContext, useState } from "react";
import {
  ArrowRightOnRectangleIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import PrimaryButton from "../Button/PrimaryButton";
import { AuthContext } from "../../contexts/AuthProvider";
import UserMenu from "./UserMenu";
import AdminMenu from "./AdminMenu";
import HostMenu from "./HostMenu";
import "./Sidebar.css";

const Sidebar = ({ role, loading }) => {
  const { user, logout } = useContext(AuthContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Small Screen Navbar */}
      {/* <div className="bg-white shadow-sm border-b border-gray-200 flex justify-between ">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">AirCnC</Link>
          </div>
        </div>
        <button className="text-black lg:hidden" onClick={toggleSidebar}>
          open modal
        </button>
      </div>
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="flex justify-center gap-5 items-start flex-col px-5 py-10">
          <Link to="/">Home</Link>
        </div>
      </div>
      <div
        className={`overlay ${isSidebarOpen ? "active" : ""}`}
        onClick={toggleSidebar}
      ></div>
      <div className="z-10 sticky top-0 h-full  border-r border-gray-200 shadow-sm sm:hidden md:fixed flex flex-col justify-between overflow-x-hidden bg-white w-64 space-y-6 px-2 py-4 inset-y-0 left-0 transform">
        <div className=" ">
          {/* Branding & Profile Info */}
          <div>
            <h2 className="text-3xl cursor-pointer font-semibold text-center text-gray-800 ">
              <Link to="/"></Link>
            </h2>
            <div className="flex flex-col items-center mt-6 -mx-2">
              <Link to="/">              <h1 className="text-center text-3xl font-courierPrime font-bold my-4">SAGOR</h1>
              </Link>
              {/* <Link to='/dashboard'>
                <img
                  className='object-cover w-24 h-24 mx-2 rounded-full'
                  src={user?.photoURL}
                  alt='avatar'
                  referrerPolicy='no-referrer'
                />
              </Link> */}
              {/* <Link to='/dashboard'>
                <h4 className='mx-2 mt-2 font-medium text-gray-800  hover:underline'>
                  {user?.displayName}
                </h4>
              </Link> */}
              <Link to="/dashboard">
                <p className="mx-2 mt-1 text-center text-sm font-medium text-gray-600  hover:underline">
                  Admin Email: <br></br> {user?.email}
                </p>
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
              {role ? (
                <>{role === "admin" ? <AdminMenu /> : <HostMenu />} </>
              ) : (
                <UserMenu />
              )}
            </nav>
          </div>
        </div>

        <div>
          <hr />
          <PrimaryButton
            handler={logout}
            classes="flex block w-full rounded-full items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5 text-white" />

            <span className="mx-4 text-white font-medium">Logout</span>
          </PrimaryButton>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
