import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from "next-auth/next";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/en/login",
  },

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
        const user = await sql`SELECT * FROM users WHERE email = ${email}`;

        const passwordsMatch = await bcrypt.compare(
          password,
          user.rows[0].password
        );

        if (user && passwordsMatch) {
          if (user.rows[0].isverified) {
            return {
              id: user.rows[0].id,
              name: user.rows[0].name,
              email: user.rows[0].email,
              isverified: user.rows[0].isverified,
            };
          } else {
            throw new Error("User not verified");
          }
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
            const result = await sql`
              INSERT INTO users (name, email, isverified, providerId) 
              VALUES (${user.name}, ${user.email}, true, ${user.id}) 
              RETURNING id`;
            return true;
          } else {
            const existingUser = users[0];
            if (!existingUser.providerId) {
              const updateResult = await sql`
                UPDATE users 
                SET providerId = ${user.id} 
                WHERE email = ${user.email} 
                RETURNING id`;
            }
            console.log("User already exists with email:", user.email);
            return true;
          }
        } catch (error) {
          console.error("Error inserting or updating user data:", error);
          return false;
        }
      } else {
        return false;
      }
    },
    async session({ session, token, user }) {
      session.user = {
        ...session.user,
        id: token.id,
        email: token.email,
        name: token.name,
        isverified: token.isverified,
      };
      return session;

      //   110762457640271535622
    },
    async jwt({ token, user }) {
      if (user) {
        token = {
          ...token,
          id: user.id,
          email: user.email,
          name: user.name,
          isverified: user.isverified,
        };
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
};
