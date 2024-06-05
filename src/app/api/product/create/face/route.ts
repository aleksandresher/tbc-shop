import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { title, description, category, price, amount, userEmail } =
    await request.json();

  try {
    if (!title || !description || !price || !category || !amount)
      throw new Error("title, description and price are required");

    const { rows: users } =
      await sql`SELECT * FROM users WHERE email = ${userEmail}`;
    if (users.length > 0) {
      const userId = users[0].id;
      await sql`INSERT INTO faceproducts (title, description, category, price, amount, user_id) VALUES (${title}, ${description}, ${category},${price}, ${amount}, ${userId});`;
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const products = await sql`SELECT * FROM faceproducts;`;

  return NextResponse.json({ products }, { status: 200 });
}
