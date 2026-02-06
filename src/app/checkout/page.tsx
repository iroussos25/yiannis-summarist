"use client"; 
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js"; 
import CheckoutForm from "@/components/checkoutForm"; 
import { useSearchParams } from "next/navigation"; 
import { useAppSelector } from '@/app/redux/hooks'; 

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState("");
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan"); 
  const { user } = useAppSelector(state => state.auth); 

  useEffect(() => {
    if (!plan) {
      console.warn("No plan selected for checkout.");
      return;
    }
    const amount = plan === "yearly" ? 9999 : 999; 

    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: amount,
        planId: plan, 
        userId: user?.uid || null 
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          console.error("Failed to get clientSecret:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error fetching PaymentIntent:", error);
      });
  }, [plan, user?.uid]); 

  const appearance = {
    theme: 'stripe' as const, 
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh', 
      background: '#f1f6f4' 
    }}>
     
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      ) : (
        <div className="spinner" style={{ margin: 'auto' }}></div> 
      )}
    </div>
  );
}
