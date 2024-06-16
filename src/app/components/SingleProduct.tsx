"use client";
import { useQuery } from "@tanstack/react-query";
import { loadSingle } from "@/lib/laod-single";
import Image from "next/image";

interface ProductProps {
  product_id: number;
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

export default function SingleProductPageCard({
  id,
  locale,
}: {
  id: string;
  locale: string;
}) {
  const { data, isLoading, error } = useQuery<ProductProps[]>({
    queryKey: ["singleProduct"],
    queryFn: () => loadSingle({ id }),
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

  return (
    <section>
      <div className="product-card">
        <h2>{selectedLanguage.title}</h2>
        <p>
          Price: {selectedLanguage.price} {selectedLanguage.currency}
        </p>
        <p>Brand: {selectedLanguage.brand}</p>
        <p>Description: {selectedLanguage.sdescription}</p>
        <p>Description: {selectedLanguage.ldescription}</p>
        <Image
          src={selectedLanguage.image}
          alt={selectedLanguage.title}
          width={200}
          height={200}
        />
      </div>
      <h3>Comments</h3>
    </section>
  );
}
