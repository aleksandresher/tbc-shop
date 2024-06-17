import { NextRequest, NextResponse } from "next/server";
import { QueryResult, QueryResultRow } from "@vercel/postgres";

import { sql } from "@vercel/postgres";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret });

  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized: You must be logged in to send messages" },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { title, message, email } = body;

    if (!title || !message || !email) {
      return NextResponse.json(
        { message: "Title, message, and email are required" },
        { status: 400 }
      );
    }

    const messageresult: QueryResult<QueryResultRow> = await sql`
    INSERT INTO contact_message (title, text, email, created_at)
    VALUES (${title}, ${message}, ${email}, NOW() )
    RETURNING id;
  `;

    return NextResponse.json({ messageresult }, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
