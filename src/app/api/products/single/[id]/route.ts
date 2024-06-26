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

  const { id } = params;
  

  try {
    const { rows: product } = await sql`
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
                  'totalvotes', p.totalvotes,
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
                  'numberofvotes', p.numberofvotes,
                  'totalvotes', p.totalvotes,
                  'size', p.size
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
          p.id = ${id}
           ORDER BY
          p.creation_time DESC;`;

  
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
