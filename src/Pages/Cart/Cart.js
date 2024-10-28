import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState, useEffect } from "react";
import CheckoutForm from "./CheckoutForm";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect( () =>{
      
  },[])

  useEffect(() => {
    // Load cart from localStorage when component mounts
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // Remove from Cart functionality
  const removeFromCart = (productToRemove) => {
    const updatedCart = cart.filter((product) => product._id !== productToRemove._id);
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
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // TODO: ADD PUBLISHABLE KEY
  const stripePromise = loadStripe('pk_test_51M95efHKtD2PGvOuiKU700FfXCTPrQ3080hQT7DTNIT0t43MvJL3YqoLLpvNz4C4KwzN3E9V3SDDdIzubSACERWG00482N2iu5')


  
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item._id} className="mb-2 flex justify-between items-center">
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

      {/* Display total price */}
      {cart.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">Total Price: {calculateTotalPrice()}</h3>
        </div>
      )}

      <Elements stripe={stripePromise}>
           <CheckoutForm cart={cart} ></CheckoutForm>
      </Elements>
    </div>
  );
};

export default Cart;
