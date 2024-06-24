import { sql } from "@vercel/postgres";
import { NextResponse, NextRequest } from "next/server";

interface Params {
  category: string;
  id: string;
}

export const GET = async (
  request: NextRequest,
  { params }: { params: Params },
  response: NextResponse
) => {
  const { category, id } = params;

  try {
    let items;
    switch (category) {
      case "face":
        ({ rows: items } =
          await sql`SELECT * FROM faceproducts WHERE id=${id}`);
        break;
      case "body":
        ({ rows: items } =
          await sql`SELECT * FROM bodyproducts WHERE id=${id}`);
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
