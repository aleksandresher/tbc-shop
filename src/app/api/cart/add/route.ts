import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export const revalidate = 0;

export async function POST(req: NextRequest) {
  const { productId, product_type } = await req.json();
  const token = await getToken({ req, secret });
  const userId = token?.id;

  if (!productId || !userId || !product_type) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const { rows: existingCartItem } = await sql`
        SELECT * FROM cart
        WHERE user_id = ${userId} AND product_id = ${productId}
      `;
    if (existingCartItem.length > 0) {
      return NextResponse.json(
        { error: "Product already in cart" },
        { status: 409 }
      );
    } else {
      await sql`
          INSERT INTO cart (user_id, product_id, product_type, quantity)
          VALUES (${userId}, ${productId}, ${product_type}, 1)
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
}
