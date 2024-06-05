import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams;
  const id = query.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "id parameter is missing" },
      { status: 400 }
    );
  }

  try {
    const { rows: products } =
      await sql`SELECT * FROM products WHERE user_id = ${id} ORDER BY`;

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
