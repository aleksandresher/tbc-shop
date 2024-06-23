import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret });
  const userId = token?.sub;

  if (userId) {
    return NextResponse.json({ message: "authenticated" }, { status: 200 });
  } else {
    return NextResponse.json({ message: "unauthenticated" }, { status: 401 });
  }
}
