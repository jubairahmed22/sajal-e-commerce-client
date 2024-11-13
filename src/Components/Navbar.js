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
    <div className="sticky top-0">
      <div className="">
        <nav class="  bg-white dark:bg-gray-900 sticky w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
          <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link
              to="/"
              class="flex items-center space-x-3 rtl:space-x-reverse"
            >
              {/* <img
                src="https://flowbite.com/docs/images/logo.svg"
                class="h-8"
                alt="Flowbite Logo"
              /> */}
              <span class="self-center font-courierPrime text-2xl font-semibold whitespace-nowrap dark:text-white">
                SAGOR
              </span>
            </Link>
            {user ? (
              <div class="flex gap-2 lg:order-2 space-x-2 lg:space-x-0 rtl:space-x-reverse">
                <Link
                  to="/dashboard"
                  class="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  DASHBOARD
                </Link>
                <button
                  onClick={logout}
                  class="text-black bg-blue-100 hover:bg-blue-100 focus:ring-4 focus:outline-none focus:ring-blue-600 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  LOG OUT
                </button>
              </div>
            ) : (
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
            )}

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
                    HOME
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
                    CONTACT
                  </Link>
                </li>
                {/* <li>
                  <Link
                    to="/about"
                    className={`block py-2 px-3 rounded ${
                      isActive("/about")
                        ? "text-blue-700 font-bold"
                        : "text-gray-900 lg:hover:text-blue-700"
                    } hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent`}
                  >
                    ABOUT
                  </Link>
                </li> */}
                <li>
                  <Link
                    to="/cart"
                    className={`block py-2 px-3 rounded ${
                      isActive("/cart")
                        ? "text-blue-700 font-bold"
                        : "text-gray-900 lg:hover:text-blue-700"
                    } hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent`}
                  >
                    CART <span className="font-bold">{cart.length}</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div class="lg:hidden md:hidden fixed z-50 w-full h-16 max-w-md -translate-x-1/2 bg-white border border-gray-400 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
        <div class="flex justify-center items-center gap-20 h-full max-w-lg   mx-auto">
          <Link to="/">
            <img
              alt=""
              className="w-10"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB4PSIwIiB5PSIwIiB2aWV3Qm94PSIwIDAgMy4wNDggMy4wNDgiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xhc3M9IiI+PGc+PHBhdGggZD0iTTIuMTI4IDEuNjkzdi41NzFhLjA0LjA0IDAgMCAxLS4wNC4wNDFoLS4zN2EuMDQuMDQgMCAwIDEtLjA0LS4wNHYtLjMxMWEuMDQuMDQgMCAwIDAtLjA0Mi0uMDQxaC0uMjI0YS4wNC4wNCAwIDAgMC0uMDQxLjA0di4zMTFhLjA0LjA0IDAgMCAxLS4wNC4wNDFILjk2YS4wNC4wNCAwIDAgMS0uMDQtLjA0di0uNTcySC45MmwuMzAxLS4zMDYuMjcyLS4yNzdhLjA0LjA0IDAgMCAxIC4wMy0uMDEyLjA0LjA0IDAgMCAxIC4wMjguMDEybC4yNzIuMjc3eiIgZmlsbD0iIzAwMDAwMCIgb3BhY2l0eT0iMSIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9IiI+PC9wYXRoPjxwYXRoIGQ9Im0xLjU4Mi43NjcuNDIyLjQyOS4zNDMuMzQ5YS4wOC4wOCAwIDAgMSAuMDE3LjA4OS4wOC4wOCAwIDAgMS0uMDc1LjA1aC0uMDAyYS4wNzkuMDc5IDAgMCAxLS4wNTgtLjAyNWwtLjM0Mi0uMzQ3TDEuNTguOTk5QzEuNTY0Ljk4MyAxLjU0NC45NzUgMS41MjIuOTc1cy0uMDQzLjAwOC0uMDU5LjAyNGwtLjMwNy4zMTMtLjM0MS4zNDdhLjA4LjA4IDAgMCAxLS4wNTcuMDIzLjA4LjA4IDAgMCAxLS4wNTItLjE0MmwuMzM4LS4zNDQuNDIyLS40MjlhLjA3OS4wNzkgMCAwIDEgLjA1OC0uMDI0Yy4wMjMgMCAuMDQyLjAwOC4wNTguMDI0eiIgZmlsbD0iIzAwMDAwMCIgb3BhY2l0eT0iMSIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9IiI+PC9wYXRoPjxwYXRoIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTEuNTI0IDBhMS41MiAxLjUyIDAgMCAxIDEuNTI0IDEuNTI0IDEuNTIgMS41MiAwIDAgMS0xLjUyNCAxLjUyNEExLjUyIDEuNTIgMCAwIDEgMCAxLjUyNCAxLjUyIDEuNTIgMCAwIDEgMS41MjQgMHptLjg5OC42MjZhMS4yNjYgMS4yNjYgMCAwIDAtMS43OTYgMCAxLjI2NiAxLjI2NiAwIDAgMCAwIDEuNzk2IDEuMjY2IDEuMjY2IDAgMCAwIDEuNzk2IDAgMS4yNjYgMS4yNjYgMCAwIDAgMC0xLjc5NnoiIGZpbGw9IiMwMDAwMDAiIG9wYWNpdHk9IjEiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIGNsYXNzPSIiPjwvcGF0aD48L2c+PC9zdmc+"
            />{" "}
          </Link>
          <Link
            to="/cart"
            className="flex flex-row gap-1 text-md font-semibold font-jost"
          >
            <img
              alt=""
              className="w-10"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB4PSIwIiB5PSIwIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PGc+PHBhdGggZD0iTTUwMC40MTIgMTAzLjcwMkExNS4wMDEgMTUuMDAxIDAgMCAwIDQ4OSA5OC40MzZIMTQyLjYxNkwxNDAuMiA3OS45NjdjLTIuMjI5LTE3LjAwNC0xMC40OTctMzIuNTQ2LTIzLjI4MS00My43NjMtMTIuNzgzLTExLjIxNC0yOS4yNjYtMTcuMzkxLTQ2LjQxMi0xNy4zOTFIMjNjLTguMjg0IDAtMTUgNi43MTYtMTUgMTVzNi43MTYgMTUgMTUgMTVoNDcuNTA3YzIwLjQ4NSAwIDM3LjI4NiAxNC43NDEgMzkuOTQ3IDM1LjA0OGwzMS45MjMgMjQ0LjA2LS45ODIuMDg1Yy0yNi41MjcgMi4zMjMtNDYuMzggMjQuOTY3LTQ1LjE5OCA1MS41MjkgMS4xNDMgMjYuNTgzIDIyLjg3MSA0Ny4zNzkgNDkuNDg1IDQ3LjM3OWguMDc4bDE1LjU5LS4wMjVhNDcuODgzIDQ3Ljg4MyAwIDAgMC0zLjU0NCAxOC4xMDRjMCAyNi41NzMgMjEuNjA2IDQ4LjE5MiA0OC4xNjQgNDguMTkyczQ4LjE5Mi0yMS42MTkgNDguMTkyLTQ4LjE5MmE0Ny44NjcgNDcuODY3IDAgMCAwLTMuNjAzLTE4LjI0OGw5Ni4xNjctLjE1NWE0Ny44NjYgNDcuODY2IDAgMCAwLTMuNTQxIDE4LjA5MmMwIDI2LjU3NCAyMS42MTkgNDguMTkzIDQ4LjE5MiA0OC4xOTNzNDguMTY0LTIxLjYxOSA0OC4xNjQtNDguMTkzLTIxLjYwNi00OC4xNjQtNDguMTY0LTQ4LjE2NGgtLjAyNGwtMjQ1LjY0MS4zOTZoLS4wMzFhMTkuNDc4IDE5LjQ3OCAwIDAgMS0xOS41MTQtMTguNjg5Yy0uNDY3LTEwLjQ4NSA3LjM3MS0xOS40MTYgMTcuODMxLTIwLjMzMmwyODAuMzg5LTI0LjMyYzI3LjA2NS0yLjMzOCA0OC4xMzktMjEuOTM3IDUyLjQzOS00OC43NzZsMjYuOTg1LTE2OC45OTZhMTUuMDA2IDE1LjAwNiAwIDAgMC0zLjQtMTIuMXpNMjA1Ljk3IDQ2My4xODZjLTEwLjAxNiAwLTE4LjE2NC04LjE2MS0xOC4xNjQtMTguMTkyczguMTQ4LTE4LjE2NSAxOC4xNjQtMTguMTY1IDE4LjE5MiA4LjE0OCAxOC4xOTIgMTguMTY1LTguMTYxIDE4LjE5Mi0xOC4xOTIgMTguMTkyem0yMDMuNTcyLTE4LjUwNGMwIDEwLjAzMi04LjE0OCAxOC4xOTMtMTguMTY0IDE4LjE5M3MtMTguMTkyLTguMTYxLTE4LjE5Mi0xOC4xOTMgOC4xNjEtMTguMTY0IDE4LjE5MS0xOC4xNjRoLjAwMmMxMC4wMTUgMCAxOC4xNjMgOC4xNDkgMTguMTYzIDE4LjE2NHpNMjI5LjExNCAyODEuMDM5Yy0uNDc3LjA0NS0uOTUxLjA2Ny0xLjQyMS4wNjctNy42NTIgMC0xNC4xODctNS44MjctMTQuOTE3LTEzLjU5OGwtOS40MS0xMDAuMTQ1Yy0uNzc0LTguMjQ4IDUuMjgzLTE1LjU2MiAxMy41MzEtMTYuMzM3IDguMjM4LS43NzQgMTUuNTYyIDUuMjgzIDE2LjMzOCAxMy41MzFsOS40MSAxMDAuMTQ1Yy43NzQgOC4yNDgtNS4yODMgMTUuNTYyLTEzLjUzMSAxNi4zMzd6bTk1LjgyNy0xNC45MzRjMCA4LjI4NC02LjcxNiAxNS0xNSAxNXMtMTUtNi43MTYtMTUtMTVWMTY1Ljk2YzAtOC4yODQgNi43MTYtMTUgMTUtMTVzMTUgNi43MTYgMTUgMTV6bTkxLjU3NC05OC43MzctOS40MzggMTAwLjE0NWMtLjczMiA3Ljc2OS03LjI2NyAxMy41OTMtMTQuOTE2IDEzLjU5My0uNDcyIDAtLjk0Ni0uMDIyLTEuNDI1LS4wNjctOC4yNDgtLjc3Ny0xNC4zMDQtOC4wOTMtMTMuNTI2LTE2LjM0MWw5LjQzOC0xMDAuMTQ1Yy43NzYtOC4yNDggOC4wOTUtMTQuMzEyIDE2LjM0MS0xMy41MjYgOC4yNDguNzc3IDE0LjMwNCA4LjA5MyAxMy41MjYgMTYuMzQxeiIgZmlsbD0iIzAwMDAwMCIgb3BhY2l0eT0iMSIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCI+PC9wYXRoPjwvZz48L3N2Zz4="
            />
            <h1>{cart.length}</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
