import CheckoutForm from "@/components/checkoutForm";
import { Suspense } from "react";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading checkout...</div>}>
      <CheckoutForm />
    </Suspense>
  );
}