import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const { id, data } = await req.json();
  const { title, price, description } = data;

  try {
    if (!id) {
      return NextResponse.json(
        { error: "Product id is required" },
        { status: 400 }
      );
    }

    const result = await sql`
      UPDATE faceproducts
      SET title = ${title}, price = ${price}, description = ${description}
      WHERE id = ${id}
    `;

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Product updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}
