import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams;
  const email = query.get("email");
  const token = query.get("token");
  console.log("email", email, "token", token);
  try {
    const { rows: users } =
      await sql`SELECT * FROM users WHERE email = ${email}`;
    console.log("users", users);
    if (users.length > 0) {
      console.log("user", users[0]);
      console.log("token", users[0].token);
      const isValid = users[0].token === token;
      console.log("isValid", isValid);
      if (isValid) {
        await sql`UPDATE users SET isverified = true WHERE email = ${email}`;

        return NextResponse.json({
          message: "Email verified successfully.",
        });
      } else {
        return NextResponse.json(
          { message: "Invalid token." },
          { status: 400 }
        );
      }
    }
  } catch (err) {
    console.log("Error verifying user:", err);
    return NextResponse.json(
      { message: "Error verifying email." },
      { status: 500 }
    );
  }
}
