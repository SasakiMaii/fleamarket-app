import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../../components/cart-form/CheckoutForm";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";


const stripePromise = loadStripe(
  "pk_test_51MlMrOB3V27vlWJWlPWsfkQet7REEO553Sw8PKjllmqPucZZvoUBUrY9YzqykxH6HQRhshMUc8s0lF684DJJjKDt00P4HYw7xz"
);

export default function Home() {
  const [clientSecret, setClientSecret] = useState("");

  const location = useLocation();
  const priceData = location.state;
  useEffect(() => {
    fetch("http://localhost:4242/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((err) => console.log(err));
  }, []);

  const appearance: any = {
    theme: "stripe",
  };
  const options: any = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Home">
      <Box sx={{ m: 5,fontSize:"20px",borderBottom:1 }}>購入金額</Box>
      <Box sx={{m:2,fontSize:"30px"}}>¥{priceData.toLocaleString()}</Box>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
