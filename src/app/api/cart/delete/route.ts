import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function DELETE(req: NextRequest) {
  const { productId } = await req.json();
  const token = await getToken({ req, secret });
  const userId = token?.id;

  try {
    if (!productId) {
      throw new Error("product_id is required");
    }

    const result = await sql`
      DELETE FROM cart
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
        message: "Item removed from cart successfully",
        removedItem: result.rows[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error executing SQL query:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
