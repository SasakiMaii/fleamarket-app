import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../../components/cart-form/CheckoutForm";
import { Box } from "@mui/material";


interface Appearance {
  theme: 'stripe';
}

const stripePromise = loadStripe("pk_test_51MlMrOB3V27vlWJWlPWsfkQet7REEO553Sw8PKjllmqPucZZvoUBUrY9YzqykxH6HQRhshMUc8s0lF684DJJjKDt00P4HYw7xz");

export default function App() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance: Appearance = {
    theme: 'stripe',
  };
  const options: any = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      <Box sx={{p:5}}>購入内容</Box>
      {/* {cartのループ} */}
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
