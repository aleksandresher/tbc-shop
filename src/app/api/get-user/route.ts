import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const query = req.nextUrl.searchParams;
  const email = query.get("email");
  console.log("email", email);
  try {
    const { rows: users } =
      await sql`SELECT * FROM users WHERE email = ${email};`;
    const user = users[0];
    cookieStore.set("userId", user.id);
    console.log("user", user);

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
