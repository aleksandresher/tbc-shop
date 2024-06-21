// pages/api/products/rate.ts
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams;

  const productId = query.get("productId");
  console.log("productId", productId);

  if (!productId) {
    return NextResponse.json(
      { error: "Product ID is required" },
      { status: 400 }
    );
  }

  try {
    const { rows: products } = await sql`
      SELECT id, totalvotes, numberofvotes
      FROM products
      WHERE id = ${productId}
    `;

    if (products.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const item = products[0];
    return NextResponse.json({ item }, { status: 200 });
  } catch (error) {
    console.error("Error fetching product rating:", error);
    return NextResponse.json(
      { error: "Failed to fetch product rating" },
      { status: 500 }
    );
  }
}
