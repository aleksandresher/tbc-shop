"use client";
import { useQuery } from "@tanstack/react-query";
import { getByCategory } from "@/services/func";
import RelatedProductCard from "../card/RelatedCard";
interface LanguageObject {
  title: string;
  category: string;
  country: string;
  brand: string;
  sdescription: string;
  ldescription: string;
  price: number;
  currency: string;
  totalvotes: number;
  numberofvotes: number;
  image: string;
}

interface Product {
  product_id: number;
  languages: {
    en: LanguageObject;
    ka: LanguageObject;
  };
}

interface DataType {
  products: Product[];
}
export default function ProductsByCategory({
  category,
  locale,
}: {
  category: string;
  locale: string;
}) {
  const { data, isLoading, error } = useQuery<DataType>({
    queryKey: ["productByCategory", category],
    queryFn: () => getByCategory({ category }),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data || data.products.length === 0) {
    return null; // Return null if no data or no products
  }
  return (
    <section className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {data.products.map((item: Product) => {
        const selectedLanguage =
          locale === "ka" ? item.languages.ka : item.languages.en;
        const averageRating =
          item.languages.en.totalvotes > 0
            ? item.languages.en.totalvotes / item.languages.en.numberofvotes
            : 0;

        return (
          <RelatedProductCard
            key={item.product_id}
            productId={item.product_id}
            image={selectedLanguage.image}
            averageRating={averageRating}
            totalVotes={selectedLanguage.totalvotes}
            title={selectedLanguage.title}
          />
        );
      })}
    </section>
  );
}
