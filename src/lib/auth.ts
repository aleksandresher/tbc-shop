import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from "next-auth/next";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/en/login",
  },
  // Providers array will be configured in the next steps
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials) return null;
        const { email, password } = credentials;
        console.log("email", email, "password", password);
        const user = await sql`SELECT * FROM users WHERE email = ${email}`;
        console.log("user", user);

        const passwordsMatch = await bcrypt.compare(
          password,
          user.rows[0].password
        );
        console.log("match", passwordsMatch);

        if (user && passwordsMatch) {
          return {
            id: user.rows[0].id,
            name: user.rows[0].name,
            email: user.rows[0].email,
          };
        } else {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn && user) {
        try {
          const { rows: users } =
            await sql`SELECT * FROM users WHERE email = ${user.email}`;

          if (users.length === 0) {
            console.log(user);
            const result =
              await sql`INSERT INTO users (name, email) VALUES (${user.name}, ${user.email}) RETURNING id`;
            console.log("New user created:", result);
            return true;
          } else {
            console.log("User already exists with email:", user.email);
            return true;
          }
        } catch (error) {
          console.error("Error inserting user data:", error);
          return false;
        }
      } else {
        return false;
      }
    },
  },

  session: {
    strategy: "jwt",
  },
  // Additional configuration will be added here
};
