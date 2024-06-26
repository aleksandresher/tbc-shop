import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams;
  const email = query.get("email");

  try {
    const { rows: users } = await sql`
      SELECT email, image, name, role 
      FROM users 
      WHERE email = ${email};
    `;
    const user = users[0];

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
