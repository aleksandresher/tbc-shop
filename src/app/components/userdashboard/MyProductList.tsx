"use client";
import { useQuery } from "@tanstack/react-query";
import { getMyProducts } from "@/services/func";
import Single from "../products/card/Single";

interface LanguageObject {
  title: string;
  category: string;
  country: string;
  brand: string;
  sdescription: string;
  ldescription: string;
  price: number;
  currency: string;
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

interface ParamsType {
  locale: string;
}

export default function MyProductList({ locale }: { locale: string }) {
  const { data, isLoading, error } = useQuery<DataType>({
    queryKey: ["myproducts"],
    queryFn: () => getMyProducts(),
  });

  if (isLoading) {
    <div>is loading</div>;
  }
  if (error) {
    <div>{error.message}</div>;
  }

  const mappedData = Array.isArray(data)
    ? data.map((product) => ({
        product_id: product.product_id,
        languages:
          locale === "en" ? product.languages.en : product.languages.ka,
      }))
    : [];

  return (
    <section className="grid grid-cols-4 gap-3">
      {mappedData?.map((item: Product) => (
        <Single
          item={item.languages}
          productId={item.product_id}
          key={item.product_id}
        />
      ))}
    </section>
  );
}
