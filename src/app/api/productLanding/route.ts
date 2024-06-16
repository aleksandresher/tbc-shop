import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(req: NextRequest) {
  try {
    const { rows: products } = await sql`
      SELECT id FROM products
    `;

    const items = products.map((product) => ({
      id: product.id,
    }));

    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);

    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
