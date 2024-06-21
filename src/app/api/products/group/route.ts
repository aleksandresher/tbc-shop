import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams;

  const category = query.get("category");
  console.log("category", category);
  try {
    const { rows: products } = await sql`
      SELECT
          p.id AS product_id,
          jsonb_build_object(
              'en', jsonb_build_object(
                  'title', COALESCE(pt_en.title, ''),
                  'category', COALESCE(pt_en.category, ''),
                  'country', COALESCE(pt_en.country, ''),
                  'brand', COALESCE(pt_en.brand, ''),
                  'sdescription', COALESCE(pt_en.sdescription, ''),
                  'ldescription', COALESCE(pt_en.ldescription, ''),
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
                  'country', COALESCE(pt_ka.country, ''),
                  'brand', COALESCE(pt_ka.brand, ''),
                  'sdescription', COALESCE(pt_ka.sdescription, ''),
                  'ldescription', COALESCE(pt_ka.ldescription, ''),
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
          (pt_en.category = ${category} OR pt_ka.category = ${category})
      LIMIT 4;
    `;
    console.log("product", JSON.stringify(products));
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
