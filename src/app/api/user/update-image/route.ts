import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function PUT(req: NextRequest) {
  const token = await getToken({ req, secret });
  const email = token?.email;
  const { imageUrl } = await req.json();

  try {
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const result = await sql`
      UPDATE users
      SET image = ${imageUrl}
      WHERE email = ${email}
    `;

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User image updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update user image" },
      { status: 500 }
    );
  }
}
