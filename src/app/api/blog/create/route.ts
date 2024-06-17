import { sql, QueryResultRow, QueryResult } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import Stripe from "stripe";

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  const token = await getToken({ req, secret });
  const { data, image } = await req.json();
  try {
    console.log("Received data:", data);

    const { title, content, author } = data;

    if (!title || !content) {
      throw new Error("Required fields are missing");
    }

    if (!token?.id) {
      console.log("Token or user ID is missing");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let userIdQuery;
    if (typeof token.id === "string" && parseInt(token.id, 10) <= 2147483647) {
      userIdQuery = sql`
        SELECT id, role
        FROM users
        WHERE id = ${parseInt(token.id, 10)} OR (providerid = ${token.id})
      `;
    } else {
      userIdQuery = sql`
        SELECT id, role
        FROM users
        WHERE providerid = ${token.id}
      `;
    }

    const { rows: users } = await userIdQuery;

    if (users.length === 0) {
      console.log("User not found");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userId = users[0].id;
    console.log("user", users);

    if (users[0].role !== "admin") {
      console.log("User does not have admin privileges");
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const blogResult: QueryResult<QueryResultRow> = await sql`
      INSERT INTO blog_posts (title, content, author,  image, author_id)
      VALUES (${title}, ${content}, ${author}, ${image}, ${userId})
      RETURNING id;
    `;

    return NextResponse.json({ blogResult }, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
