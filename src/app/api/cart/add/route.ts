import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export const revalidate = 0;

export async function POST(req: NextRequest) {
  const { productId } = await req.json();
  const token = await getToken({ req, secret });
  console.log("token", token);

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

    try {
      const { rows: existingCartItem } = await sql`
        SELECT *
        FROM cart
        WHERE user_id = ${userId} AND product_id = ${productId}
      `;

      if (existingCartItem.length > 0) {
        return NextResponse.json(
          { error: "Product already in cart" },
          { status: 409 }
        );
      } else {
        await sql`
          INSERT INTO cart (user_id, product_id, quantity)
          VALUES (${userId}, ${productId},  1)
        `;
      }

      return NextResponse.json(
        { message: "Product added to cart" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error adding to cart:", error);
      return NextResponse.json(
        { error: "Failed to add to cart" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
