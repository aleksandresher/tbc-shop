import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { title, description, category, price, userEmail } =
    await request.json();

  try {
    if (!title || !description || !price)
      throw new Error("title, description and price are required");

    const { rows: users } =
      await sql`SELECT * FROM users WHERE email = ${userEmail}`;
    if (users.length > 0) {
      const userId = users[0].id;
      await sql`INSERT INTO products (title, description, category, price, user_id) VALUES (${title}, ${description}, ${category},${price}, ${userId});`;
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const products = await sql`SELECT * FROM products;`;

  return NextResponse.json({ products }, { status: 200 });
}
