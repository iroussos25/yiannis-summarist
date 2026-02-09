import { Suspense } from "react";

import CheckoutClient from "./separate";

export default function CheckoutPage() {

return (

<Suspense fallback={<div>Loading checkout...</div>}>

<CheckoutClient/>

</Suspense>

);

}