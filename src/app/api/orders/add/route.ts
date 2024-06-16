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

  const { items } = await req.json();

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
      WHERE providerid = ${token.id}
    `;
  }

  try {
    const { rows: users } = await userIdQuery;

    if (users.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userId = users[0].id;
    console.log("User ID:", userId);

    for (const item of items) {
      await sql`
          INSERT INTO orders (user_id, product_id, amount, created_at)
          VALUES (${userId}, ${item.product_id}, ${item.quantity}, NOW())
        `;
      await sql`
        DELETE FROM cart
        WHERE user_id = ${userId}
      `;
    }

    return NextResponse.json(
      { message: "Order saved and cart items deleted successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
