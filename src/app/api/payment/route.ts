import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { sql } from "@vercel/postgres";
const secret = process.env.NEXTAUTH_SECRET;
const URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  let { items } = await req.json();
  console.log("items in payment", JSON.stringify(items));

  const token = await getToken({ req, secret });

  if (!token) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  let userIdQuery;
  if (typeof token.id === "string" && parseInt(token.id, 10) <= 2147483647) {
    userIdQuery = sql`
      SELECT id
      FROM users
      WHERE id = ${parseInt(token.id, 10)} OR (providerid = ${token.id})
    `;
  } else {
    userIdQuery = sql`
      SELECT id
      FROM users
       WHERE providerid = ${token.sub}
    `;
  }

  const { rows: users } = await userIdQuery;

  if (users.length === 0) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const userId = users[0].id;

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

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      payment_intent_data: {
        metadata: {
          id: userId,
        },
      },
      mode: "payment",
      success_url: `${URL}/en/dashboard/payment/success`,
      cancel_url: `${URL}/en/dashboard/payment/cancel`,
    });
    console.log("payment was successfull");
    return NextResponse.json(session.url);
  } catch (error) {
    console.error("Error creating Stripe Checkout session:", error);
    return NextResponse.json(
      { error: "Failed to create Stripe Checkout session" },
      { status: 500 }
    );
  }
}
