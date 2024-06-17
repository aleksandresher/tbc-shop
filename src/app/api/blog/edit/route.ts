import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function PUT(req: NextRequest) {
  const token = await getToken({ req, secret });
  const { data } = await req.json();

  try {
    console.log("Received data:", data);

    const { id, title, content, author, image } = data;

    if (!title || !content) {
      throw new Error("Required fields are missing");
    }

    if (!token?.id) {
      console.log("Token or user ID is missing");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let userIdQuery;
    if (typeof token.id === "string" && parseInt(token.id, 10) <= 2147483647) {
      userIdQuery = sql`
        SELECT id, role
        FROM users
        WHERE id = ${parseInt(token.id, 10)} OR providerid = ${token.id}
      `;
    } else {
      userIdQuery = sql`
        SELECT id, role
        FROM users
        WHERE providerid = ${token.id}
      `;
    }

    const { rows: users } = await userIdQuery;

    if (users.length === 0) {
      console.log("User not found");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (users[0].role !== "admin") {
      console.log("User does not have admin privileges");
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await sql`
      UPDATE blog_posts
      SET title = ${title}, image = ${image}, content = ${content}, author = ${author}
      WHERE id = ${id};
    `;

    const { rows: updatedPosts } = await sql`
      SELECT * FROM blog_posts WHERE id = ${id};
    `;

    console.log("Updated blog post:", updatedPosts[0]);

    return NextResponse.json({ blogPost: updatedPosts[0] }, { status: 200 });
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
