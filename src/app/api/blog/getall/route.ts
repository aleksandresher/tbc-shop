import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const { rows: blogs } = await sql`
      SELECT *
      FROM blog_posts;
    `;
    console.log("blogs in route", blogs);
    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    console.error("Failed to retrieve blogs:", error);
    return NextResponse.json(
      { error: "Failed to retrieve blogs" },
      { status: 500 }
    );
  }
}
