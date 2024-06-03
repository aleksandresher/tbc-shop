import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams;
  const email = query.get("email");

  if (!email) {
    return NextResponse.json(
      { error: "Email parameter is missing" },
      { status: 400 }
    );
  }

  try {
    const { rows: users } =
      await sql`SELECT * FROM users WHERE email = ${email}`;
    if (users.length > 0) {
      const userId = users[0].id;
      const { rows: products } =
        await sql`SELECT * FROM products WHERE user_id = ${userId};`;
      const result = products[0];
      return NextResponse.json({ result }, { status: 200 });
    } else {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
