import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export const revalidate = 0;

export async function PUT(req: NextRequest) {
  const token = await getToken({ req, secret });
  const email = token?.email;
  const { data } = await req.json();
  const { name } = data;

  try {
    if (!email) {
      return NextResponse.json({ error: "email is required" }, { status: 400 });
    }

    const result = await sql`
      UPDATE users
      SET  name=${name}
      WHERE email = ${email}
    `;

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "user not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "user updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
