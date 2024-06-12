import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export const revalidate = 0;

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret });
  const email = token?.email;

  try {
    if (!email) {
      return NextResponse.json({ error: "email is required" }, { status: 400 });
    }

    const result = await sql`
    SELECT name, image, email
    FROM users
    WHERE email = ${email}
  `;

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to retrieve user" },
      { status: 500 }
    );
  }
}
