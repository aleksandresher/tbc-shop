import { sql } from "@vercel/postgres";
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

export const revalidate = 0;

export async function GET() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  try {
    const products = await stripe.products.list({
      limit: 40,
    });

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
