import React, { useState, useEffect } from "react";

const ElectricalCart = () => {
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [shope, setShope] = useState("");

  useEffect(() => {
    // Load cart from localStorage when component mounts
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // Remove from Cart functionality
  const removeFromCart = (productToRemove) => {
    const updatedCart = cart.filter(
      (product) => product._id !== productToRemove._id
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save updated cart in localStorage
    setCart(updatedCart); // Update cart state
  };

  // Increment Quantity
  const incrementQuantity = (product) => {
    const updatedCart = cart.map((item) =>
      item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  // Decrement Quantity
  const decrementQuantity = (product) => {
    const updatedCart = cart
      .map((item) =>
        item._id === product._id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.sellingPrice * item.quantity,
      0
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const paymentData = {
      name,
      address,
      phoneNumber,
      shope,
      products: cart.map((item) => ({
        title: item.title,
        quantity: item.quantity,
      })),
      totalPrice: calculateTotalPrice(),
    };

    // Call your backend to save the payment details
    const response = await fetch("http://localhost:8000/save-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentData),
    });

    if (response.ok) {
      alert("Payment details saved successfully!");
    } else {
      alert("Failed to save payment details.");
    }
  };

  return (
    <div>
      {/* Display total price */}

      <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Shopping Cart
          </h2>

          <div class="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <ul>
                {cart.map((item) => (
                  <div class="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl mb-2">
                    <div class="space-y-6">
                      <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                        <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                          <a href="#" class="shrink-0 md:order-1">
                            <img
                              class="h-20 w-20 dark:hidden"
                              src={item.singleImage}
                              alt="imac image"
                            />
                            <img
                              class="hidden h-20 w-20 dark:block"
                              src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                              alt="imac image"
                            />
                          </a>
                          <a href="#" class="shrink-0 md:order-1">
                           <p class="text-base font-extralight text-gray-800 dark:text-white">
                              Price: {item.sellingPrice}
                              </p>
                          </a>

                          <label for="counter-input" class="sr-only">
                            Choose quantity:
                          </label>
                          <div class="flex items-center justify-between md:order-2 md:justify-end">
                            <div class="flex items-center">
                              <button
                                onClick={() => decrementQuantity(item)}
                                type="button"
                                id="decrement-button"
                                data-input-counter-decrement="counter-input"
                                class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                              >
                                <svg
                                  class="h-2.5 w-2.5 text-gray-900 dark:text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 18 2"
                                >
                                  <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M1 1h16"
                                  />
                                </svg>
                              </button>
                              <h1 class="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white">
                                {item.quantity}
                              </h1>

                              <button
                                type="button"
                                onClick={() => incrementQuantity(item)}
                                id="increment-button"
                                data-input-counter-increment="counter-input"
                                class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                              >
                                <svg
                                  class="h-2.5 w-2.5 text-gray-900 dark:text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 18 18"
                                >
                                  <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9 1v16M1 9h16"
                                  />
                                </svg>
                              </button>
                            </div>
                            <div class="text-end md:order-4 md:w-32">
                              <p class="text-base font-bold text-gray-900 dark:text-white">
                                {/* {item.sellingPrice} x {item.quantity} ={" "} */}
                                Total : {item.sellingPrice * item.quantity} tk
                              </p>
                            </div>
                          </div>

                          <div class="w-full min-w-0 flex-1 space-y-4 md:order-5 md:max-w-md">
                            <a
                              href="#"
                              class="text-base font-medium text-gray-900 hover:underline dark:text-white "
                            >
                              {item.title} 
                            </a>

                            <div class="flex items-center gap-4">
                              <button
                                type="button"
                                class="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                                onClick={() => removeFromCart(item)}
                              >
                                <svg
                                  class="me-1.5 h-5 w-5"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M6 18 17.94 6M18 18 6.06 6"
                                  />
                                </svg>
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
            )}

            <div class="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full w-[40%]">
              <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <p class="text-xl font-semibold text-gray-900 dark:text-white">
                  Order summary
                </p>

                <div class="space-y-4">
                  <dl class=" border-t border-gray-200 pt-2 dark:border-gray-700">
                    <form onSubmit={handleSubmit}>
                      <div class="mb-6">
                        <label
                          for="name"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block lg:w-[50%] md:w-full sm:w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Type..."
                          required
                        />
                      </div>
                      
                      <div class="mb-6">
                        <label
                          for="phone"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
                        >
                          Phone number
                        </label>

                        <input
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          type="tel"
                          id="phone"
                          class="bg-gray-50 border border-gray-300 lg:w-[50%] md:w-full sm:w-full text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="162 996 4630"
                          required
                        />
                      </div>
                      <div class="mb-6">
                        <label
                          for="shope"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Shope Name
                        </label>
                        <input
                          type="text"
                          id="shope"
                          value={shope}
                          onChange={(e) => setShope(e.target.value)}
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Type..."
                          required
                        />
                      </div>
                      <div class="mb-6">
                        <label
                          for="address"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Address
                        </label>
                        <textarea  value={address}
                          onChange={(e) => setAddress(e.target.value)}
                           id="address" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>

                        {/* <input
                          type="text"
                          id="address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Type..."
                          required
                        /> */}
                      </div>
                      

                      {cart.length > 0 && (
                        <dd class="font-bold text-gray-600 dark:text-white mb-6 text-3xl">
                          Total <span className="text-gray-900">{calculateTotalPrice()} Tk</span>
                        </dd>
                      )}

                      <button
                        type="submit"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Submit
                      </button>
                    </form>
                  </dl>
                </div>

                <div class="flex items-center justify-center gap-2">
                  <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                    {" "}
                    or{" "}
                  </span>
                  <a
                    href="#"
                    title=""
                    class="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                  >
                    Continue Shopping
                    <svg
                      class="h-5 w-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 12H5m14 0-4 4m4-4-4-4"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default ElectricalCart;
