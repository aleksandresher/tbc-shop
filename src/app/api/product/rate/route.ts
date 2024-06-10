import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req: NextRequest) {
  const { productId, rating } = await req.json();
  console.log("productId", productId, "rating", rating);
  const token = await getToken({ req, secret });
  const userId = token?.id;

  const productIdNumber = parseInt(productId);
  const ratingNumber = parseInt(rating);

  if (!userId || !productId || !rating) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const { rowCount } = await sql`
      SELECT 1 FROM ratings WHERE user_id = ${userId} AND product_id = ${productIdNumber}
    `;

    if (rowCount > 0) {
      return NextResponse.json(
        { error: "You have already rated this product" },
        { status: 400 }
      );
    }

    await sql`
      INSERT INTO ratings (user_id, product_id, rating)
      VALUES (${userId}, ${productIdNumber}, ${ratingNumber})
    `;

    await sql` UPDATE products
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
