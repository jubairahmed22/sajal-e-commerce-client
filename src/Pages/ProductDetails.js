import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL params
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8000/products/details/${id}`
        );
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const productIndex = existingCart.findIndex(
      (item) => item._id === product._id
    );

    let updatedCart;
    if (productIndex > -1) {
      // If product already exists in cart, increment the quantity
      updatedCart = existingCart.map((item, index) =>
        index === productIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      // Otherwise, add the product with a quantity of 1
      updatedCart = [...existingCart, { ...product, quantity: 1 }];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save updated cart in localStorage
    setCart(updatedCart); // Update cart state
    toast.success(`${product.title} has been added to the cart!`);

    // Navigate to the cart page after showing the toast
    setTimeout(() => {
      navigate("/cart");
    }, 1000); // Add a delay to allow toast to display before navigation
  };


  if (!product) {
    return <p>No product found</p>;
  }

  return (
    <section class="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
      <div class="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div class="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div class="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <img class="w-full dark:hidden" src={product.singleImage} alt="" />
            <img
              class="w-full hidden dark:block"
              src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
              alt=""
            />
          </div>

          <div class="mt-6 sm:mt-8 lg:mt-0">
            <h1 class="text-2xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              {product.title}
            </h1>
            <h1 class="text-xl text-gray-900 sm:text-2xl dark:text-white">
              Company : {product.company}
            </h1>
            <h1 class="text-xl text-gray-900 sm:text-2xl dark:text-white">
              Model : {product.model}
            </h1>
            <h1 class="text-xl font-thin text-gray-900 sm:text-2xl dark:text-white">
              Product Id : {product.productId}
            </h1>

            <div class="mt-4 sm:items-center sm:gap-4 sm:flex">
              <p class="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                {product.sellingPrice} Taka
              </p>
            </div>

            <div class="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
             
              <button
                              onClick={() => addToCart(product)}

              type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
<svg class="w-3.5 h-3.5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
<path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
</svg>
Buy now
</button>
            </div>

            <hr class="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

            {/* <p class="mb-6 text-gray-500 dark:text-gray-400">
            {product.description}
          </p> */}
            <ul className="mb-6 text-gray-500 dark:text-gray-400 list-disc list-inside">
              {product.description
                .split("-")
                .map(
                  (line, index) =>
                    line.trim() && <li key={index}>{line.trim()}</li>
                )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
