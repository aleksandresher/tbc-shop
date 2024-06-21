"use client";
import { useQuery } from "@tanstack/react-query";
import { getByCategory } from "@/services/func";
import RelatedProductCard from "../card/RelatedCard";
interface ProductProps {
  product_id: number;
  numberofvotes: number;
  totalvotes: number;
  languages: {
    en: {
      size: number;
      brand: string;
      image: string;
      price: number;
      title: string;
      country: string;
      category: string;
      currency: string;
      totalvotes: number;
      ldescription: string;
      sdescription: string;
      numberofvotes: number;
    };
    ka: {
      size: number;
      brand: string;
      image: string;
      price: number;
      title: string;
      country: string;
      category: string;
      currency: string;
      totalvotes: number;
      ldescription: string;
      sdescription: string;
      numberofvotes: number;
    };
  };
}

export default function ProductsByCategory({
  category,
  locale,
}: {
  category: string;
  locale: string;
}) {
  const { data, isLoading, error } = useQuery<ProductProps[]>({
    queryKey: ["productByCategory", category],
    queryFn: () => getByCategory({ category }),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No product data available</div>;
  }

  const { en, ka } = data[0].languages;
  const selectedLanguage = locale === "ka" ? ka : en;
  console.log("selected language", selectedLanguage);
  const avarageRating = data[0].totalvotes / data[0].numberofvotes;
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {/* {selectedLanguage.map((item: any) => {
        return (
          <RelatedProductCard
            key={item.product_id}
            productId={item.product_id}
            image={selectedLanguage.title}
            averageRating={avarageRating}
            totalVotes={item.totalvotes}
            title={selectedLanguage.title}
          />
        );
      })} */}
    </section>
  );
}
