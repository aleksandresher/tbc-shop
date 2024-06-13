import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req: NextRequest) {
  const { productId } = await req.json();
  const token = await getToken({ req, secret });

  if (!productId || !token?.id) {
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

    const result = await sql`
      UPDATE cart
      SET quantity = quantity + 1
      WHERE user_id = ${userId} AND product_id = ${productId}
      RETURNING *
    `;

    if (result.rowCount === 0) {
      return NextResponse.json(
        { message: "Item not found in the cart" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Item count increased successfully",
        updatedItem: result.rows[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error executing SQL query:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
