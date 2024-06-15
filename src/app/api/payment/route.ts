import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  let { items } = await request.json();
  console.log("Received items:", items);

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json(
      { error: "Invalid or empty items array" },
      { status: 400 }
    );
  }

  try {
    const lineItems = items.map((item: { id: string; quantity: number }) => ({
      price: item.id,
      quantity: item.quantity,
    }));

    console.log("Line items for Stripe session:", lineItems);

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/en/dashboard/payment/success",
      cancel_url: "http://localhost:3000/en/dashboard/payment/cancel",
    });

    return NextResponse.json(session.url);
  } catch (error) {
    console.error("Error creating Stripe Checkout session:", error);
    return NextResponse.json(
      { error: "Failed to create Stripe Checkout session" },
      { status: 500 }
    );
  }
}
