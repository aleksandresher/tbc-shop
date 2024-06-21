import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req: NextRequest) {
  const { productId, rating } = await req.json();
  const token = await getToken({ req, secret });

  if (!productId || !rating || !token?.id) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const productIdNumber = parseInt(productId);
  const ratingNumber = parseInt(rating);

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

    const { rowCount: existingRatingCount } = await sql`
      SELECT 1 FROM ratings WHERE user_id = ${userId} AND product_id = ${productIdNumber}
    `;

    if (existingRatingCount > 0) {
      return NextResponse.json(
        { error: "You have already rated this product" },
        { status: 400 }
      );
    }

    const { rows: productOwners } = await sql`
      SELECT user_id FROM products WHERE id = ${productIdNumber}
    `;

    if (productOwners.length > 0 && productOwners[0].user_id === userId) {
      return NextResponse.json(
        { error: "You cannot rate your own product" },
        { status: 400 }
      );
    }

    await sql`
      INSERT INTO ratings (user_id, product_id, rating)
      VALUES (${userId}, ${productIdNumber}, ${ratingNumber})
    `;

    await sql`
      UPDATE products
      SET numberofvotes = numberofvotes + 1,
          totalvotes = totalvotes + ${ratingNumber}
      WHERE id = ${productIdNumber}
    `;

    return NextResponse.json(
      { message: "Rating submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting rating:", error);
    return NextResponse.json(
      { error: "Failed to submit rating" },
      { status: 500 }
    );
  }
}
