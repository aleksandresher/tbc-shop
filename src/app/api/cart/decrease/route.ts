import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req: NextRequest) {
  const { productId } = await req.json();
  const token = await getToken({ req, secret });
  const userId = token?.id;

  try {
    if (!productId) {
      return NextResponse.json(
        { error: "productId is required" },
        { status: 400 }
      );
    }
    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const result = await sql`
      UPDATE cart
      SET quantity = quantity - 1
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
        message: "Item count decreased successfully",
        updatedItem: result.rows[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error executing SQL query:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
