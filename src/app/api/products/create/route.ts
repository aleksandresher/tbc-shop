import { sql, QueryResultRow, QueryResult } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret });
  const userId = token?.id;
  console.log("userId", userId);

  const { data } = await req.json();
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
    kasize,
    enprice,
    kaprice,
    image,
  } = data;

  try {
    if (
      !kacategory ||
      !katitle ||
      !kabrand ||
      !kacountry ||
      !kasdescription ||
      !kasize ||
      !kaprice ||
      !image
    )
      throw new Error("field is missing");

    const { rows: users } = await sql`SELECT * FROM users WHERE id = ${userId}`;
    console.log("users", users);
    if (users.length > 0) {
      const userId = users[0].id;
      const productResult: QueryResult<QueryResultRow> = await sql`
      INSERT INTO products (size, image, user_id)
      VALUES (${kasize}, ${image}, ${userId})
      RETURNING id;
    `;
      const productId = productResult.rows[0].id;
      const currencygel = "GEL";
      const currencyUSD = "USD";
      const en = "en";
      const ka = "ka";

      if (
        entitle &&
        encategory &&
        encountry &&
        enbrand &&
        ensdescription &&
        enldescription &&
        enprice
      ) {
        await sql`
          INSERT INTO product_translations (title, category, country, brand, language, product_id, sdescription, ldescription, price, currency)
          VALUES (${entitle}, ${encategory}, ${encountry}, ${enbrand}, ${en}, ${productId}, ${ensdescription}, ${enldescription}, ${enprice}, ${currencyUSD});
        `;
      }

      await sql`INSERT INTO product_translations (title, category, country, brand, language, product_id, sdescription, ldescription, price, currency ) VALUES (${katitle}, ${kacategory},  ${kacountry}, ${kabrand}, ${ka}, ${productId}, ${kasdescription}, ${kaldescription}, ${kaprice}, ${currencygel});`;
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }

  const product = await sql`SELECT * FROM products where user_id = ${userId};`;
  console.log(product);

  return NextResponse.json({ product }, { status: 200 });
}
