import { sql, QueryResultRow, QueryResult } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function PUT(req: NextRequest) {
  const token = await getToken({ req, secret });
  const userId = token?.id;
  console.log("userId", userId);

  const { data, productId } = await req.json();
  console.log(data);
  const {
    entitle,
    enbrand,
    encountry,
    encategory,
    ensdescription,
    enldescription,
    katitle,
    kabrand,
    kacountry,
    kacategory,
    kasdescription,
    kaldescription,
    size,
    enprice,
    kaprice,
    image,
  } = data;

  try {
    if (
      !encategory ||
      !entitle ||
      !enbrand ||
      !encountry ||
      !ensdescription ||
      !size ||
      !enprice ||
      !image
    )
      throw new Error("field is missing");

    const { rows: users } = await sql`SELECT * FROM users WHERE id = ${userId}`;
    console.log("users", users);
    if (users.length > 0) {
      const { rows: products } = await sql`
        SELECT * FROM products WHERE id = ${productId} AND user_id = ${userId};
      `;

      if (products.length === 0) {
        throw new Error(
          "Product not found or you do not have permission to edit this product"
        );
      }

      await sql`
        UPDATE products
        SET size = ${size}, image = ${image}
        WHERE id = ${productId};
      `;

      const currencygel = "GEL";
      const currencyUSD = "USD";
      const en = "en";
      const ka = "ka";

      await sql`
        UPDATE product_translations
        SET title = ${entitle}, category = ${encategory}, country = ${encountry}, brand = ${enbrand}, sdescription = ${ensdescription}, ldescription = ${enldescription}, price = ${enprice}, currency = ${currencyUSD}
        WHERE product_id = ${productId} AND language = ${en};
      `;

      await sql`
        UPDATE product_translations
        SET title = ${katitle}, category = ${kacategory}, country = ${kacountry}, brand = ${kabrand}, sdescription = ${kasdescription}, ldescription = ${kaldescription}, price = ${kaprice}, currency = ${currencygel}
        WHERE product_id = ${productId} AND language = ${ka};
      `;
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }

  const product = await sql`SELECT * FROM products where id = ${productId};`;
  console.log(product);

  return NextResponse.json({ product }, { status: 200 });
}
