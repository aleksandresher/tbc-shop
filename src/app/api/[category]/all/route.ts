import { sql } from "@vercel/postgres";
import { NextResponse, NextRequest } from "next/server";

interface Params {
  category: string;
}

export const GET = async (
  request: NextRequest,
  { params }: { params: Params },
  response: NextResponse
) => {
  const { category } = params;
  console.log("category", category);
  try {
    let items;
    switch (category) {
      case "face":
        ({ rows: items } = await sql`SELECT * FROM faceproducts`);
        break;
      case "body":
        ({ rows: items } = await sql`SELECT * FROM bodyproducts`);
        break;

      default:
        return NextResponse.json({ error: "Invalid category", status: 500 });
    }
    console.log("items", items);
    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch items" },
      { status: 500 }
    );
  }
};
