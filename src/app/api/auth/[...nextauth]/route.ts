import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { sql } from "@vercel/postgres";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn && user) {
        try {
          await sql`INSERT INTO users (name, email) VALUES (${user.name}, ${user.email})`;
        } catch (error) {
          console.error("Error inserting user data:", error);

          return false;
        }
        return true;
      } else {
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
