import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage when component mounts
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // Function to add products to the cart
  const addToCart = (product) => {
    const existingCart = [...cart];
    const productIndex = existingCart.findIndex((item) => item._id === product._id);

    if (productIndex > -1) {
      // If product already exists in cart, increment the quantity
      existingCart[productIndex].quantity += 1;
    } else {
      // Otherwise, add the product with a quantity of 1
      existingCart.push({ ...product, quantity: 1 });
    }

    setCart(existingCart); // Update cart state
    localStorage.setItem("cart", JSON.stringify(existingCart)); // Save updated cart in localStorage
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
