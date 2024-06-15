import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  let { arrayOfIds } = await request.json();
  console.log("array", arrayOfIds);

  const validPriceIds = arrayOfIds.filter((priceId: any) => priceId !== null);

  const lineItems = validPriceIds.map((priceId: string) => ({
    price: priceId,
    quantity: 1,
  }));
  console.log("line items", lineItems);

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,

    mode: "payment",
    success_url: "http://localhost:3000/en/dashboard/payment/success",
    cancel_url: "http://localhost:3000/en/dashboard/payment/cancel",
  });
  return NextResponse.json(session.url);
}
