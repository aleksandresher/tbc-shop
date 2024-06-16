import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getToken } from "next-auth/jwt";
import { sql } from "@vercel/postgres";

const secret = process.env.NEXTAUTH_SECRET;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret });

    if (!token?.id) {
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
                WHERE id = ${parseInt(token.id, 10)} OR (providerid = ${
        token.id
      })
              `;
    } else {
      userIdQuery = sql`
                SELECT id
                FROM users
                WHERE providerid = ${token.id}
              `;
    }

    const { rows: users } = await userIdQuery;

    if (users.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userId = users[0].id;
    console.log("userId", userId);

    const orders = await stripe.paymentIntents.list({
      expand: ["data.latest_charge"],
    });

    const orderList = orders.data;

    const filteredData = orderList.filter(
      (payment) => payment.metadata.id == userId
    );

    return NextResponse.json(filteredData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
