import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalOrderPrice, setTotalOrderPrice] = useState(0);
  const [phoneNumberInput, setPhoneNumberInput] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [startDate, setStartDate] = useState(""); // New state for start date
  const [endDate, setEndDate] = useState(""); // New state for end date
  const limit = 5;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/admin/orders`, {
          params: {
            page,
            phoneNumber,
            startDate,
            endDate,
          },
        });
        const { products, totalPages, totalOrders, totalOrderPrice } =
          response.data;
        setOrders(products);
        setTotalPages(totalPages);
        setTotalOrders(totalOrders);
        setTotalOrderPrice(totalOrderPrice);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [page, phoneNumber, startDate, endDate]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleFilter = () => {
    setPage(1);
    setPhoneNumber(phoneNumberInput);
  };

  const handleCancel = () => {
    setPage(1);
    setPhoneNumberInput("");
    setPhoneNumber("");
    setStartDate(""); // Clear start date
    setEndDate(""); // Clear end date
  };

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product? This action cannot be undone."
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8000/deleteOrders/${productId}`);
        setOrders(orders.filter((product) => product._id !== productId));
        toast.success("Product deleted successfully.");
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete the product. Please try again.");
      }
    }
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };
  return (
    <div className="bg-gray-50 h-screen">
      <div className="py-6 px-5 w-full bg-white border-b-2">
        <h1 className="text-xl font-roboto text-black font-bold">
          My Products
        </h1>
      </div>

      <div className="p-5">
        {/* Filter inputs for phone number and date range */}
        <div className="">
          <div className="flex flex-col gap-2">
            <label className="text-lg font-roboto  text-gray-900">Title</label>

            <input
              type="text"
              placeholder="Enter phone number"
              className="w-56 h-10 border rounded border-black font-roboto px-4"
              value={phoneNumberInput}
              onChange={(e) => setPhoneNumberInput(e.target.value)}
            />
          </div>

          <div className="my-2 flex flex-row gap-2">
          <button
            className="bg-gray-700 text-white px-4 py-1 rounded"
            onClick={handleFilter}
          >
            Filter
          </button>
          <button
            className="bg-gray-600 text-white px-4 py-1 rounded"
            onClick={handleCancel}
          >
            Cancel
          </button>
          </div>
        </div>

        {/* Orders table */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Shop</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Address</th>
                <th className="px-6 py-3">Order Date</th>
                <th className="px-6 py-3">Products</th>
                <th className="px-6 py-3">Total</th>
                <th className="px-6 py-3">Delete</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b">
                  <td className="px-6 py-4">{order.shope}</td>
                  <td className="px-6 py-4">{order.phoneNumber}</td>
                  <td className="px-6 py-4">{order.address}</td>
                  <td className="px-6 py-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <ol>
                      {order.products.map((product, index) => (
                        <li key={index}>
                         {index + 1} {product.title} - Quantity: {product.quantity}
                        </li>
                      ))}
                    </ol>
                  </td>
                  <td className="px-6 py-4">{order.totalPrice}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="text-blue-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        <div className="flex justify-end items-center mt-3">
          <span className="mr-4 text-sm">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
            className="px-3 h-8 bg-gray-800 text-white rounded-l"
          >
            Prev
          </button>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages}
            className="px-3 h-8 bg-gray-800 text-white rounded-r"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
