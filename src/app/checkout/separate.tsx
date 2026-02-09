"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useAppSelector } from '@/app/redux/hooks';
import dynamic from "next/dynamic";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
const CheckoutForm = dynamic(
    () => import("@/components/checkoutForm"),
    { ssr: false }
  );


export default function CheckoutClient() {
  const [clientSecret, setClientSecret] = useState("");
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");
  const { user } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (!plan) return;

    const amount = plan === "yearly" ? 9999 : 999;

    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount,
        planId: plan,
        userId: user?.uid || null
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        }
      })
      .catch(console.error);

  }, [plan, user?.uid]);

  const options = {
    clientSecret,
    appearance: { theme: 'stripe' as const },
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: '#f1f6f4'
    }}>

        <Elements options={options} stripe={stripePromise}>
      {clientSecret ? (
          <CheckoutForm />
        ) : (
            <div className="spinner" style={{ margin: 'auto' }}></div>
        )}
        </Elements>
    </div>
  );
}