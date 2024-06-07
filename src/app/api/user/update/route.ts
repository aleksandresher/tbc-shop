import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function PUT(req: NextRequest) {
  const token = await getToken({ req, secret });
  const id = token?.id;
  const { avatar } = await req.json();

  try {
    if (!id) {
      return NextResponse.json(
        { error: "user id id is required" },
        { status: 400 }
      );
    }

    const result = await sql`
      UPDATE users
      SET image = ${avatar}
      WHERE id = ${id}
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
