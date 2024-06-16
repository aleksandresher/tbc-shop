import SingleProductPageCard from "@/app/components/SingleProduct";

export async function generateStaticParams() {
  const response = await fetch("http://localhost:3000/api/productLanding");
  const products = await response.json();
  console.log("products on page", products);

  return products?.items?.map((product: any) => ({
    id: product.id.toString(),
  }));
}

export default function SingleProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  return (
    <section>
      {" "}
      <SingleProductPageCard id={id} />
    </section>
  );
}
