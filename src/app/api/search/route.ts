import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import Fuse from "fuse.js";

export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

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
                'totalvotes', p.totalvotes
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
                'totalvotes', p.totalvotes
            )
        ) AS languages
    FROM
        products AS p
    LEFT JOIN
        product_translations AS pt_en ON p.id = pt_en.product_id AND pt_en.language = 'en'
    LEFT JOIN
        product_translations AS pt_ka ON p.id = pt_ka.product_id AND pt_ka.language = 'ka'
    WHERE
        pt_en.language IS NOT NULL OR pt_ka.language IS NOT NULL;
  `;

    const searchResults = products.map((product: any) => ({
      kaTitle: product.languages.ka.title,
      enTitle: product.languages.en.title,
      image: product.languages.ka.image,
      id: product.product_id,
    }));

    const fuse = new Fuse(searchResults, {
      keys: ["kaTitle", "enTitle"],
      includeScore: true,
      threshold: 0.4,
    });

    const filteredResults = fuse.search(query).map((result) => result.item);
    console.log("filteredResults", filteredResults);

    return NextResponse.json({
      success: true,
      results: filteredResults,
      message: "Here are your search results",
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong",
    });
  }
}
