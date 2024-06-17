import SingleProductPageCard from "@/app/components/SingleProduct";
import { loadSingle } from "@/lib/laod-single";
import { Metadata, ResolvingMetadata } from "next";
interface Props {
  params: { id: string; locale: string };
}

export async function generateStaticParams() {
  const response = await fetch("http://localhost:3000/api/productLanding");
  const products = await response.json();
  console.log("products on page", products);

  return products?.items?.map((product: any) => ({
    id: product.id.toString(),
  }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id, locale } = params;

  const product = await loadSingle({ id });

  const { en, ka } = product[0].languages;
  const selectedLanguage = locale === "ka" ? ka : en;

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
      {" "}
      <SingleProductPageCard id={id} locale={locale} />
    </section>
  );
}
