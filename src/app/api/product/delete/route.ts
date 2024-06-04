import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const query = req.nextUrl.searchParams;
  const userId = query.get("userId");
  const productId = query.get("productId");
  console.log("userId", userId, "productId", productId);

  try {
    if (!userId || !productId)
      throw new Error("userId and productId are required");

    const { rows: product } =
      await sql`SELECT * FROM products WHERE id = ${productId};`;

    if (product.length === 0) {
      throw new Error("Product not found");
    }
    if (product[0].user_id.toString() !== userId) {
      console.log("error");
      throw new Error("Unauthorized");
    }

    await sql`DELETE FROM products WHERE id = ${Number(productId)};`;
    return NextResponse.json("Product deleted successfully", { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
