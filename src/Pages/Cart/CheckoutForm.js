import React, { useContext, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { AuthContext } from '../../contexts/AuthProvider';

const CheckoutForm = ({ cart }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext);  // Get the logged-in user details

    // Form state for user details
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSubmit = async (event) => {
      event.preventDefault();
  
      if (!stripe || !elements) {
        return;
      }
  
      const cardElement = elements.getElement(CardElement);
      const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  
      // Call your backend to create a payment intent
      const response = await fetch('http://localhost:8000/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price: totalAmount }),
      });
  
      const { clientSecret } = await response.json();
  
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });
  
      if (result.error) {
        console.error(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          console.log('Payment successful!');

          // Prepare payment data, including the user email, name, phone, and address
          const paymentData = {
            paymentId: result.paymentIntent.id,
            email: user.email,  // User's email from context
            name,  // User's inputted name
            address,  // User's inputted address
            phoneNumber,  // User's inputted phone number
            products: cart.map(item => ({
              title: item.title,
              quantity: item.quantity,
            })),
            totalPrice: totalAmount,
          };
  
          // Call your backend to save the payment details
          await fetch('http://localhost:8000/save-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(paymentData),
          });
  
          // Optionally clear the cart or show a success message
        }
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div>
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button className="w-56 h-10 bg-blue-900 text-white my-2" type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    );
};

export default CheckoutForm;
