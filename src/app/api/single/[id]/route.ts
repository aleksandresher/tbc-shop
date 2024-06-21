import { sql } from "@vercel/postgres";
import { NextResponse, NextRequest } from "next/server";

interface Params {
  id: string;
}

export const revalidate = 0;

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  console.log("params", params);
  const id = params.id;
  console.log("productId", id);

  try {
    const { rows: product } = await sql`
      SELECT
          p.id AS product_id,
          p.numberofvotes AS numberofvotes,
          p.totalvotes AS totalvotes,
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
                  'size', p.size
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
          p.id = ${id}
      ORDER BY
          p.creation_time DESC;
    `;

    console.log("product", product);
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
