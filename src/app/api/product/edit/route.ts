import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const { data, userId, id } = await request.json();
  const { title, price, description } = data;

  console.log(
    "title",
    title,
    "userId",
    userId,
    "price",
    price,
    "description",
    description,
    "id",
    id
  );

  try {
    if (!userId) throw new Error("userId is required");

    const { rows: product } =
      await sql`SELECT * FROM products WHERE id = ${id};`;

    console.log("product", product);

    if (product.length === 0) {
      throw new Error("Product not found");
    }
    if (product[0].user_id.toString() !== userId) {
      console.log("error");
      throw new Error("Unauthorized");
    }

    await sql`
      UPDATE products
      SET title = ${title}, price = ${price}, description = ${description}
      WHERE id = ${id};
    `;

    return NextResponse.json("Product updated successfully", { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
