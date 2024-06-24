import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { EmailTemplate } from "../../../components/EmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(JSON.stringify(body));
    // console.log("body", body);

    const { rows: users } =
      await sql`SELECT * FROM users WHERE email = ${body.email}`;
    // console.log(users);

    if (users.length > 0) {
      return NextResponse.json(
        { user: null, message: "User with this email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(body.password, 12);
    const token = bcrypt.genSaltSync();
    // console.log("token while creating user", token);

    // const { data, error } = await resend.emails.send({
    //   from: "Acme <onboarding@resend.dev>",
    //   to: [body.email],
    //   subject: "verify email",
    //   react: EmailTemplate({
    //     firstName: body.name,
    //     message: `http://localhost:3000/api/email-verify?email=${body.email}&token=${token}`,
    //   }) as React.ReactElement,
    // });
    // if (error) {
    //   return NextResponse.json({ error }, { status: 500 });
    // }
    const { rows: newUser } =
      await sql`INSERT INTO users (name, email, password, token, isverified) VALUES (${body.name}, ${body.email}, ${hashedPassword}, ${token}, true) RETURNING *`;

    return NextResponse.json({
      user: newUser,
      message: "User created successfully",
    });
  } catch {
    return NextResponse.json({ user: null, message: "Error creating user" });
  }
}
