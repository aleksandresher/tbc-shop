import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const { rows: products } = await sql`
    SELECT 
    'face' AS product_type,  -- Added product_type column with value 'face'
    id, 
    title, 
    description, 
    category, 
    price, 
    numberofvotes, 
    totalvotes, 
    user_id, 
    amount
FROM 
    faceproducts
UNION ALL
SELECT 
    'body' AS product_type,  -- Added product_type column with value 'body'
    id, 
    title, 
    description, 
    category, 
    price, 
    numberofvotes, 
    totalvotes, 
    user_id, 
    NULL AS amount  -- Added NULL for amount column since it doesn't exist in bodyproducts
FROM 
    bodyproducts
ORDER BY 
    id;
`;
    console.log("products", products);
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
