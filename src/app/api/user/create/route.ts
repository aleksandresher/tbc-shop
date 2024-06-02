import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("body", body);

    const { rows: users } =
      await sql`SELECT * FROM users WHERE email = ${body.email}`;
    console.log(users);

    if (users.length > 0) {
      return NextResponse.json(
        { user: null, message: "User with this email already exists" },
        { status: 409 }
      );
    }

    // const hashedPassword = createHash("sha256")
    //   .update(body.password)
    //   .digest("hex");

    const hashedPassword = await bcrypt.hash(body.password, 12);
    console.log("hashed password", hashedPassword);
    const newUser =
      await sql`INSERT INTO users (name, email, password) VALUES (${body.name}, ${body.email}, ${hashedPassword});`;
    console.log(newUser);
    return NextResponse.json({
      user: newUser,
      message: "User created successfully",
    });
  } catch {
    return NextResponse.json({ user: null, message: "Error creating user" });
  }
}
