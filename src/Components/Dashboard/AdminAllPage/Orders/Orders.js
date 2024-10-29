import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalOrderPrice, setTotalOrderPrice] = useState(0);
  const limit = 5;

  // Fetch orders data
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/admin/orders?page=${page}`
        );
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
  }, [page]);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div>
      <h2>Orders</h2>
      <p>Total Orders: {totalOrders}</p>
      <p>Total Order Price: {totalOrderPrice}</p>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-white uppercase bg-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Shope
              </th>
              <th scope="col" class="px-6 py-3">
                Phone
              </th>
              <th scope="col" class="px-6 py-3">
                Address
              </th>
              <th scope="col" class="px-6 py-3">
                Order Date
              </th>
              <th scope="col" class="px-6 py-3">
                Products
              </th>

              <th scope="col" class="px-6 py-3">
                Total
              </th>
              <th scope="col" class="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          {orders.map((order) => (
            <tbody>
              <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td class="px-6 py-4">{order.shope}</td>
                <td class="px-6 py-4">{order.phoneNumber}</td>
                <td class="px-6 py-4">{order.address}</td>
                <td class="px-6 py-4">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td class="px-6 py-4">
                  <ul>
                    {order.products.map((product, index) => (
                      <li key={index}>
                        {product.title} - Quantity: {product.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td class="px-6 py-4">{order.totalPrice}</td>

                <td class="px-6 py-4">
                  <button
                    // onClick={() => handleDelete(product._id)}
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
          <thead class="text-xs text-gray-900 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3"></th>
              <th scope="col" class="px-6 py-3"></th>
              <th scope="col" class="px-6 py-3"></th>
              <th scope="col" class="px-6 py-3"></th>
              <th scope="col" class="px-6 py-3"></th>

              <th scope="col" class="px-6 py-3">
                {totalOrderPrice}
              </th>
              <th scope="col" class="px-6 py-3"></th>
            </tr>
          </thead>
        </table>
      </div>

      {/* Pagination controls */}

      <div class="flex flex-row items-center  justify-end">
        <span class="text-sm text-gray-700 dark:text-gray-400 mr-4">
          <span class="font-semibold text-gray-900 dark:text-white">
            {" "}
            Page {page}{" "}
          </span>{" "}
          of{" "}
          <span class="font-semibold text-gray-900 dark:text-white">
            {totalPages}
          </span>
        </span>
        <div class="inline-flex mt-2 xs:mt-0">
          <button
        onClick={() => handlePageChange(page - 1)} disabled={page <= 1}
            class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Prev
          </button>
          <button
           onClick={() => handlePageChange(page + 1)}
           disabled={page >= totalPages}
            class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
