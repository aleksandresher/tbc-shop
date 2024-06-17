import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

interface Params {
  id: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { id } = params;
  console.log("id", id);

  try {
    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const { rows: blog } = await sql`
    SELECT id, title, content, image, author_id, created_at
    FROM blog_posts
    WHERE id = ${id}
  `;
    console.log("blog", blog);
    return NextResponse.json({ blog }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to retrieve user" },
      { status: 500 }
    );
  }
}
