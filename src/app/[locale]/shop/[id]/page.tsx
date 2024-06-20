import SingleProductPageCard from "@/app/components/SingleProduct";
import { loadSingle } from "@/services/func";
import { getAllProduct } from "@/services/func";
import { Metadata, ResolvingMetadata } from "next";
const URL = process.env.NEXT_PUBLIC_BASE_URL;

interface Props {
  params: { id: string; locale: string };
}

export async function generateStaticParams() {
  try {
    const response = await getAllProduct();

    if (!Array.isArray(response)) {
      throw new Error("Invalid response format: expected array of products");
    }

    console.log("products fetched:", response);

    const params = response.flatMap((product: any) => [
      { id: product.product_id.toString(), locale: "en" },
      { id: product.product_id.toString(), locale: "ka" },
    ]);

    console.log("Params generated:", params);

    return params;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id, locale } = params;

  const product = await loadSingle({ id });
  console.log("product", product);

  if (!product || !product[0]) {
    throw new Error(`Product with id ${id} not found`);
  }

  const { en, ka } = product[0].languages || {}; // Ensure to provide default empty objects if languages are undefined

  const selectedLanguage = locale === "ka" ? ka : en;

  if (!selectedLanguage) {
    throw new Error(
      `Product with id ${id} does not have data in ${locale} language`
    );
  }

  return {
    title: selectedLanguage.title,
  };
}

export default function SingleProductPage({
  params,
}: {
  params: { id: string; locale: string };
}) {
  const { id, locale } = params;

  return (
    <section>
      <SingleProductPageCard id={id} locale={locale} />
    </section>
  );
}
