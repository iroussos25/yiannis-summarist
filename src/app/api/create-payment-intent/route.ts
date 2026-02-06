import { NextResponse } from "next/server";
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-01-28.clover",
})

export async function POST(request: Request) {
    try {
        const { amount, planId, userId } = await request.json();

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd", 
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                planId: planId,
                userId: userId,
            }
        });
          
        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    
    } catch (error: any) {
        console.error("Stripe API Error:", error);
            return NextResponse.json({ error: "Failed to create payment intent" }, { status: 500 });
    

    }
}