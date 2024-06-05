import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams;
  const userId = query.get("user_id");

  try {
    const { rows: cartItems } = await sql`
      SELECT 
        c.id as cart_id, c.product_id, c.product_type, c.quantity, c.added_at,
        f.id as face_id, f.title as face_title, f.description as face_description, f.price as face_price, f.amount as face_amount,
        b.id as body_id, b.title as body_title, b.description as body_description, b.price as body_price
      FROM cart c
      LEFT JOIN faceproducts f ON c.product_type = 'face' AND c.product_id = f.id
      LEFT JOIN bodyproducts b ON c.product_type = 'body' AND c.product_id = b.id
      WHERE c.user_id = ${userId}
    `;

    const items = cartItems.map((item) => {
      if (item.product_type === "face") {
        return {
          cart_id: item.cart_id,
          product_id: item.face_id,
          type: item.product_type,
          title: item.face_title,
          description: item.face_description,
          price: item.face_price,
          amount: item.face_amount,
          quantity: item.quantity,
          added_at: item.added_at,
        };
      } else if (item.product_type === "body") {
        return {
          cart_id: item.cart_id,
          product_id: item.body_id,
          type: item.product_type,
          title: item.body_title,
          description: item.body_description,
          price: item.body_price,
          quantity: item.quantity,
          added_at: item.added_at,
        };
      }
    });
    console.log("cart items", items);
    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch cart items" },
      { status: 500 }
    );
  }
}
