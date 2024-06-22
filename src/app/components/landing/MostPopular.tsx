"use client";
import { useQuery } from "@tanstack/react-query";
import { getMostPopular } from "@/services/func";
import Single from "../products/card/Single";
import PopularProductsSkeleton from "../skeletons/PopularProductSkeleton";

export default function MostPopularProduct({ locale }: { locale: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["popular"],
    queryFn: () => getMostPopular(),
  });

  if (isLoading) {
    return <PopularProductsSkeleton />;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  const filteredProducts = data.products.map((item: any) => ({
    product_id: item.product_id,
    image: item.languages[locale].image,
    title: item.languages[locale].title,
    price: item.languages[locale].price,
    category: item.languages[locale].category,
    currency: item.languages[locale].currency,
    totalvotes: item.languages[locale].totalvotes,
    numberofvotes: item.languages[locale].numberofvotes,
    size: item.languages[locale].size,
    brand: item.languages[locale].brand,
  }));

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-14">
      {filteredProducts.map((product: any) => (
        <Single
          locale={locale}
          item={product}
          productId={product.product_id}
          key={product.product_id}
        />
      ))}
    </section>
  );
}
