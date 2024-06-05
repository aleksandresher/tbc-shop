import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams;
  const id = query.get("id");

  try {
    if (!id) {
      return NextResponse.json({ message: "Missing user ID" }, { status: 400 });
    }

    const { rows: products } = await sql`
      SELECT * FROM faceproducts WHERE user_id = ${id}
    `;

    console.log(products);

    return NextResponse.json({ products }, { status: 200 });
  } catch (err) {
    console.error("Error fetching face products products:", err);
    return NextResponse.json(
      { message: "Error fetching face products" },
      { status: 500 }
    );
  }
}
