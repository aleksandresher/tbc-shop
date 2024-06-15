import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret });

  if (!token?.id) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const { productIds, totalAmount } = await req.json();

  try {
    const { rows: users } = await sql`
      SELECT id
      FROM users
      WHERE id = ${parseInt(token.id, 10)} OR (providerid = ${token.id})
    `;

    if (users.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userId = users[0].id;
    const createdOrders = [];

    for (const productId of productIds) {
      const { rows: order } = await sql`
        INSERT INTO orders (user_id, product_id, amount, created_at)
        VALUES (${userId}, ${productId}, ${
        totalAmount / productIds.length
      }, NOW())
        RETURNING id
      `;

      createdOrders.push(order[0].id);
    }

    return NextResponse.json({ orderIds: createdOrders }, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
