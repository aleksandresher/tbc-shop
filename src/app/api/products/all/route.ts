import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export const revalidate = 0;

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret });
  console.log(token);
  const userId = token?.id;
  console.log("userId", userId);

  try {
    let userQuery;
    if (token?.id) {
      userQuery = sql`SELECT id FROM users WHERE providerid = ${token.id}`;
    } else if (userId) {
      userQuery = sql`SELECT id FROM users WHERE id = ${userId}`;
    } else {
      throw new Error("User ID not found in token");
    }

    const { rows: users } = await userQuery;

    if (users.length === 0) {
      throw new Error("User not found");
    }

    const userresultid = users[0].id;
    console.log("userresultid", userresultid);

    const { rows: products } = await sql`
      SELECT
          pt_en.product_id AS product_id,
          jsonb_build_object(
              'en', jsonb_build_object(
                  'title', pt_en.title,
                  'category', pt_en.category,
                  'country', pt_en.country,
                  'brand', pt_en.brand,
                  'sdescription', pt_en.sdescription,
                  'ldescription', pt_en.ldescription,
                  'price', pt_en.price,
                  'currency', pt_en.currency,
                  'image', p.image,
                  'numberofvotes', p.numberofvotes,
                  'totalvotes', p.totalvotes
              ),
              'ka', jsonb_build_object(
                  'title', pt_ka.title,
                  'category', pt_ka.category,
                  'country', pt_ka.country,
                  'brand', pt_ka.brand,
                  'sdescription', pt_ka.sdescription,
                  'ldescription', pt_ka.ldescription,
                  'price', pt_ka.price,
                  'currency', pt_ka.currency,
                  'image', p.image,
                  'numberofvotes', p.numberofvotes,
                  'totalvotes', p.totalvotes
              )
          ) AS languages
      FROM
          product_translations AS pt_en
      JOIN
          product_translations AS pt_ka ON pt_en.product_id = pt_ka.product_id
      JOIN
          products AS p ON pt_en.product_id = p.id
      WHERE
          pt_en.language = 'en' AND
          pt_ka.language = 'ka' AND
          p.user_id = ${userresultid}`;

    console.log("products", products);
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
