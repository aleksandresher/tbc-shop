import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth/next";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { sql } from "@vercel/postgres";

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//   ],

//   callbacks: {
//     async signIn({ user, account, profile, credentials }) {
//       console.log("profile", profile);

//       const isAllowedToSignIn = true;
//       if (isAllowedToSignIn && user) {
//         try {
//           const { rows: users } =
//             await sql`SELECT * FROM users WHERE email = ${user.email}`;

//           if (users.length === 0) {
//             console.log(user);
//             const result =
//               await sql`INSERT INTO users (id, name, email, image) VALUES (${user.id}, ${user.name}, ${user.email}, ${user.image})`;
//             const userId = result.rows[0].id;
//             return userId;
//           } else {
//             console.log("User already exists with email:", user.email);
//             return profile;
//           }
//         } catch (error) {
//           console.error("Error inserting user data:", error);

//           return false;
//         }
//         return true;
//       } else {
//         return false;
//       }
//     },
//     // async session({ session, profile }) {
//     //   // Send properties to the client, like an access_token and user id from a provider.

//     //   return (session.user.id = profile.sub);
//     // },
//   },
// });

// export { handler as GET, handler as POST };
