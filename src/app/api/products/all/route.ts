import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret });
    console.log("token from cart get", token);

    if (!token) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let userIdQuery;
    if (typeof token.id === "string" && parseInt(token.id, 10) <= 2147483647) {
      userIdQuery = sql`
        SELECT id
        FROM users
        WHERE id = ${parseInt(token.id, 10)} OR (providerid = ${token.id})
      `;
    } else {
      userIdQuery = sql`
        SELECT id
        FROM users
         WHERE providerid = ${token.sub}
      `;
    }

    const { rows: users } = await userIdQuery;

    if (users.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userId = users[0].id;
    console.log("userId from all products route", userId);
    try {
      const { rows: products } = await sql`
        SELECT 
          p.id as product_id, p.image, p.numberofvotes, p.totalvotes, p.size, p.stripe_product_id,
          COALESCE(pt_en.title, '') as title_en, COALESCE(pt_en.category, '') as category_en, COALESCE(pt_en.country, '') as country_en, COALESCE(pt_en.brand, '') as brand_en, COALESCE(pt_en.sdescription, '') as sdescription_en, COALESCE(pt_en.ldescription, '') as ldescription_en, COALESCE(pt_en.price::numeric, 0) as price_en, COALESCE(pt_en.currency, '') as currency_en,
          COALESCE(pt_ka.title, '') as title_ka, COALESCE(pt_ka.category, '') as category_ka, COALESCE(pt_ka.country, '') as country_ka, COALESCE(pt_ka.brand, '') as brand_ka, COALESCE(pt_ka.sdescription, '') as sdescription_ka, COALESCE(pt_ka.ldescription, '') as ldescription_ka, COALESCE(pt_ka.price::numeric, 0) as price_ka, COALESCE(pt_ka.currency, '') as currency_ka
        FROM products p
        LEFT JOIN product_translations pt_en ON p.id = pt_en.product_id AND pt_en.language = 'en'
        LEFT JOIN product_translations pt_ka ON p.id = pt_ka.product_id AND pt_ka.language = 'ka'
        WHERE p.user_id = ${userId}
      `;

      const items = products.map((item) => ({
        product_id: item.product_id,
        image: item.image,
        numberofvotes: item.numberofvotes,
        totalvotes: item.totalvotes,
        size: item.size,
        stripe_product_id: item.stripe_product_id,
        languages: {
          en: {
            title: item.title_en,
            category: item.category_en,
            country: item.country_en,
            brand: item.brand_en,
            sdescription: item.sdescription_en,
            ldescription: item.ldescription_en,
            price: item.price_en,
            currency: item.currency_en,
          },
          ka: {
            title: item.title_ka,
            category: item.category_ka,
            country: item.country_ka,
            brand: item.brand_ka,
            sdescription: item.sdescription_ka,
            ldescription: item.ldescription_ka,
            price: item.price_ka,
            currency: item.currency_ka,
          },
        },
      }));

      return NextResponse.json({ items }, { status: 200 });
    } catch (error) {
      console.error("Failed to fetch products:", error);
      return NextResponse.json(
        { error: "Failed to fetch products" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
