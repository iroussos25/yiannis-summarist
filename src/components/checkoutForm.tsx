"use client"; 

import {
  PaymentElement, 
  useStripe,      
  useElements,    
} from "@stripe/react-stripe-js";
import styles from "./CheckoutForm.module.css"; 
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckoutForm() {
  const stripe = useStripe(); 
  const elements = useElements(); 
  const router = useRouter(); 

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) return;

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) return; 

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded! You now have premium access.");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong with your payment.");
          break;
      }
    });
  }, [stripe]); 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true); 
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/for-you?payment=success`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message || "An error occurred during payment.");
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className={styles.form}>
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <button disabled={isLoading || !stripe || !elements} id="submit" className={styles.button}>
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {message && <div id="payment-message" className={styles.message}>{message}</div>}
    </form>
  );
}
