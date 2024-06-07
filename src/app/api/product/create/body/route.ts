import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { title, description, category, price, userEmail, imageUrl } =
    await request.json();
  console.log("imageUrl", imageUrl);

  try {
    if (!title || !description || !price)
      throw new Error("title, description and price are required");

    const { rows: users } =
      await sql`SELECT * FROM users WHERE email = ${userEmail}`;
    if (users.length > 0) {
      const userId = users[0].id;
      await sql`INSERT INTO bodyproducts (title, description, category, price, user_id, image) VALUES (${title}, ${description}, ${category},${price}, ${userId}, ${imageUrl});`;
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const products = await sql`SELECT * FROM bodyproducts;`;

  return NextResponse.json({ products }, { status: 200 });
}

// id, title, description, category, price, numberofvotes, totalvotes, user_id
