import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const { rows: products } = await sql`
      SELECT
          p.id AS product_id,
          jsonb_build_object(
              'en', jsonb_build_object(
                  'title', COALESCE(pt_en.title, ''),
                  'category', COALESCE(pt_en.category, ''),
                 
                  'brand', COALESCE(pt_en.brand, ''),
                 
                  'price', COALESCE(pt_en.price::numeric, 0),
                  'currency', COALESCE(pt_en.currency, ''),
                  'image', p.image,
                  'numberofvotes', p.numberofvotes,
                  'totalvotes', p.totalvotes,
                  'size', p.size
              ),
              'ka', jsonb_build_object(
                  'title', COALESCE(pt_ka.title, ''),
                  'category', COALESCE(pt_ka.category, ''),
                 
                  'brand', COALESCE(pt_ka.brand, ''),
                  
                  'price', COALESCE(pt_ka.price::numeric, 0),
                  'currency', COALESCE(pt_ka.currency, ''),
                  'image', p.image,
                  'numberofvotes', p.numberofvotes,
                  'totalvotes', p.totalvotes,
                  'size', p.size
              )
          ) AS languages
      FROM
          products AS p
      LEFT JOIN
          product_translations AS pt_en ON p.id = pt_en.product_id AND pt_en.language = 'en'
      LEFT JOIN
          product_translations AS pt_ka ON p.id = pt_ka.product_id AND pt_ka.language = 'ka'
      WHERE
          pt_en.language IS NOT NULL OR pt_ka.language IS NOT NULL
      ORDER BY
          p.totalvotes DESC
      LIMIT
          4;
    `;

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching popular products:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
