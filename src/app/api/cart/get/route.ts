import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret });

    if (!token?.id) {
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
        WHERE providerid = ${token.id}
      `;
    }

    const { rows: users } = await userIdQuery;

    if (users.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userId = users[0].id;

    try {
      const { rows: cartItems } = await sql`
        SELECT 
          c.id as cart_id, c.product_id, c.quantity, c.added_at,
          p.image, p.numberofvotes, p.totalvotes, p.size,
          pt_en.title as title_en, pt_en.category as category_en, pt_en.country as country_en, pt_en.brand as brand_en, pt_en.sdescription as sdescription_en, pt_en.ldescription as ldescription_en, pt_en.price as price_en, pt_en.currency as currency_en,
          pt_ka.title as title_ka, pt_ka.category as category_ka, pt_ka.country as country_ka, pt_ka.brand as brand_ka, pt_ka.sdescription as sdescription_ka, pt_ka.ldescription as ldescription_ka, pt_ka.price as price_ka, pt_ka.currency as currency_ka
        FROM cart c
        JOIN products p ON c.product_id = p.id
        JOIN product_translations pt_en ON p.id = pt_en.product_id AND pt_en.language = 'en'
        JOIN product_translations pt_ka ON p.id = pt_ka.product_id AND pt_ka.language = 'ka'
        WHERE c.user_id = ${userId}
      `;

      const items = cartItems.map((item) => ({
        cart_id: item.cart_id,
        product_id: item.product_id,
        quantity: item.quantity,
        added_at: item.added_at,
        image: item.image,
        numberofvotes: item.numberofvotes,
        totalvotes: item.totalvotes,
        size: item.size,
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
      return NextResponse.json(
        { error: "Failed to fetch cart items" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
