import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function DELETE(req: NextRequest) {
  const { productId } = await req.json();
  const token = await getToken({ req, secret });

  if (!token?.id) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  if (!productId) {
    throw new Error("product_id is required");
  }
  let userIdQuery;
  if (typeof token.id === "string" && parseInt(token.id, 10) <= 2147483647) {
    userIdQuery = sql`
        SELECT id, role
        FROM users
        WHERE id = ${parseInt(token.id, 10)} OR (providerid = ${token.id})
      `;
  } else {
    userIdQuery = sql`
        SELECT id, role
        FROM users
        WHERE providerid = ${token.id}
      `;
  }

  try {
    const { rows: users } = await userIdQuery;

    if (users.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (users[0].role !== "admin") {
      console.log("User does not have admin privileges");
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const result = await sql`
      DELETE FROM blog_posts
      WHERE id = ${productId}
      RETURNING *
    `;

    if (result.rowCount === 0) {
      return NextResponse.json(
        { message: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Blog post successfully deleted",
        removedItem: result.rows[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error executing SQL query:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
