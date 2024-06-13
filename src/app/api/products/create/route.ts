import { sql, QueryResultRow, QueryResult } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret });
  const { data } = await req.json();
  try {
    console.log("Received data:", data);

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

    console.log("Extracted fields:", {
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
    });

    if (
      !kacategory ||
      !katitle ||
      !kabrand ||
      !kacountry ||
      !kasdescription ||
      !kasize ||
      !kaprice ||
      !image
    ) {
      throw new Error("Required fields are missing");
    }

    console.log("All required fields are present");

    if (!token?.id) {
      console.log("Token or user ID is missing");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let userIdQuery;
    if (typeof token.id === "string" && parseInt(token.id, 10) <= 2147483647) {
      userIdQuery = sql`
        SELECT id
        FROM users
        WHERE id = ${parseInt(token.id, 10)} OR (providerid = ${token.id})
      `;
    } else {
      userIdQuery = sql`
        SELECT id
        FROM users
        WHERE providerid = ${token.id}
      `;
    }

    console.log("User ID query:", userIdQuery);

    const { rows: users } = await userIdQuery;
    console.log("Users from database:", users);

    if (users.length === 0) {
      console.log("User not found");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userId = users[0].id;
    console.log("User ID:", userId);

    const productResult: QueryResult<QueryResultRow> = await sql`
      INSERT INTO products (size, image, user_id)
      VALUES (${kasize}, ${image}, ${userId})
      RETURNING id;
    `;
    console.log("Product insert result:", productResult);

    const productId = productResult.rows[0].id;
    console.log("Inserted product ID:", productId);

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
      enprice
    ) {
      await sql`INSERT INTO product_translations (title, category, country, brand, language, product_id, sdescription, ldescription, price, currency )
      VALUES (${entitle}, ${encategory},  ${encountry}, ${enbrand}, ${en}, ${productId}, ${ensdescription}, ${enldescription}, ${enprice}, ${currencyUSD});`;
    }

    console.log("Inserted English translation");

    if (
      katitle &&
      kacategory &&
      kacountry &&
      kabrand &&
      kasdescription &&
      kaprice
    ) {
      await sql`INSERT INTO product_translations (title, category, country, brand, language, product_id, sdescription, ldescription, price, currency )
      VALUES (${katitle}, ${kacategory},  ${kacountry}, ${kabrand}, ${ka}, ${productId}, ${kasdescription}, ${kaldescription}, ${kaprice}, ${currencygel});`;
    }
    console.log("Inserted Georgian translation");

    const product = await sql`
      SELECT * FROM products WHERE id = ${productId};
    `;
    console.log("Selected product:", product);

    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
