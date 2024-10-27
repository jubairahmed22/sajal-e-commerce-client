import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const page = searchParams.get("page") || 1;
    setCurrentPage(parseInt(page));

    // Fetch products from API
    fetch(`http://localhost:8000/products?page=${page}&limit=5`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products); // Assuming your backend sends `products`
        setTotalPages(data.totalPages); // Assuming total pages are sent by backend
      });
  }, [searchParams]);

  useEffect(() => {
    // Load cart from localStorage when component mounts
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      navigate(`/products?page=${nextPage}`); // Navigate to the next page
      setSearchParams({ page: nextPage });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      navigate(`/products?page=${prevPage}`); // Navigate to the previous page
      setSearchParams({ page: prevPage });
    }
  };

  // Add to Cart functionality
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
    alert(`${product.title} has been added to the cart!`);
  };

  // Remove from Cart functionality
  const removeFromCart = (productToRemove) => {
    const updatedCart = cart.filter(
      (product) => product._id !== productToRemove._id
    ); // Remove selected product
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save updated cart in localStorage
    setCart(updatedCart); // Update cart state
  };

  // Increment Quantity
  const incrementQuantity = (product) => {
    const updatedCart = cart.map((item) =>
      item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save updated cart in localStorage
    setCart(updatedCart); // Update cart state
  };

  // Decrement Quantity
  const decrementQuantity = (product) => {
    const updatedCart = cart
      .map((item) =>
        item._id === product._id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0); // Remove the item if the quantity reaches 0

    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save updated cart in localStorage
    setCart(updatedCart); // Update cart state
  };

  // Calculate the total price of the cart
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="flex">
      {/* Left side - Cart Data */}
      <div className="w-1/4 border-r-2 border-gray-300 p-4">
        <h2 className="text-lg font-bold mb-4">Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li
                key={item._id}
                className="mb-2 flex justify-between items-center"
              >
                <span>{item.title}</span>
                <span>
                  {item.price} x {item.quantity} = {item.price * item.quantity}
                </span>
                <div className="flex items-center">
                  <button
                    className="bg-gray-300 px-2"
                    onClick={() => decrementQuantity(item)}
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    className="bg-gray-300 px-2"
                    onClick={() => incrementQuantity(item)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="bg-red-500 text-white px-2 py-1 ml-2"
                  onClick={() => removeFromCart(item)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        {/* Display total price at the bottom */}
        {cart.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-bold">
              Total Price: {calculateTotalPrice()}
            </h3>
          </div>
        )}
      </div>

      {/* Right side - Products List */}
      <div className="w-3/4 p-4">
        <h1>Products</h1>
        <div className="grid grid-cols-3 gap-5 w-[1000px] mx-auto">
          {products.map((product) => (
            <div
              className="w-full h-56 border-2 border-gray-400"
              key={product._id}
            >
              <Link to={`/product-details/${product._id}`}>
                {product.title}
              </Link>
              <h1>{product.price}</h1>
              <button
                className="bg-blue-500 text-white px-4 py-2 mt-2"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        <div>
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
