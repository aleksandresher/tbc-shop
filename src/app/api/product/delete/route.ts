import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function DELETE(req: NextRequest) {
  const token = await getToken({ req, secret });
  const id = token?.id;

  const query = req.nextUrl.searchParams;
  const productId = query.get("productId");
  const category = query.get("category");

  try {
    if (!id || !productId) throw new Error("userId and productId are required");

    const { rows: product } =
      await sql`SELECT * FROM products WHERE id = ${productId};`;

    if (product.length === 0) {
      throw new Error("Product not found");
    }
    if (product[0].user_id.toString() !== id) {
      console.log("error");
      throw new Error("Unauthorized");
    }

    await sql`DELETE FROM products WHERE id = ${Number(productId)};`;
    return NextResponse.json("Product deleted successfully", { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
