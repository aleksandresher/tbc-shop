import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function DELETE(req: NextRequest) {
  const token = await getToken({ req, secret });

  if (!token) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  const query = req.nextUrl.searchParams;
  const productId = query.get("productId");

  if (!productId) {
    return NextResponse.json(
      { error: "Missing productId parameter" },
      { status: 400 }
    );
  }

  try {
    let userIdQuery;

    if (typeof token.id === "string" && parseInt(token.id, 10) <= 2147483647) {
      userIdQuery = sql`
        SELECT id
        FROM users
        WHERE id = ${parseInt(token.id, 10)} OR providerid = ${token.id}
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

    // Check if the product exists and belongs to the user
    const { rows: productCheck } = await sql`
      SELECT id
      FROM products
      WHERE id = ${productId} AND user_id = ${userId}
    `;

    if (productCheck.length === 0) {
      return NextResponse.json(
        { error: "Product not found or not owned by user" },
        { status: 404 }
      );
    }

    // Delete the product
    await sql`DELETE FROM products WHERE id = ${productId} AND user_id = ${userId}`;

    return NextResponse.json("Product deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
