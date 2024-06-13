"use client";
import { useQuery } from "@tanstack/react-query";
import { getMyProducts } from "@/services/func";
import MySingle from "./MySingle";

interface LanguageObject {
  title: string;
  category: string;
  country: string;
  brand: string;
  sdescription: string;
  ldescription: string;
  price: number;
  currency: string;
  image: string;
  numberofvotes: number;
  totalvotes: number;
  size: number;
}

interface Product {
  product_id: number;
  languages: {
    en: LanguageObject;
    ka: LanguageObject;
  };
}

interface MappedProduct {
  product_id: number;
  filteredLanguage: LanguageObject;
  fullLanguages: {
    en: LanguageObject;
    ka: LanguageObject;
  };
}

interface DataType {
  products: Product[];
}

interface MyProductListProps {
  locale: string;
}

export default function MyProductList({ locale }: MyProductListProps) {
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

  const mappedData: MappedProduct[] = Array.isArray(data)
    ? data.map((product) => ({
        product_id: product.product_id,
        filteredLanguage:
          locale === "en" ? product.languages.en : product.languages.ka,
        fullLanguages: product.languages,
      }))
    : [];

  return (
    <section className="grid grid-cols-4 gap-3">
      {JSON.stringify(data)}
      {mappedData?.map((item) => (
        <MySingle
          item={item.filteredLanguage}
          fullLanguages={item.fullLanguages}
          productId={item.product_id}
          key={item.product_id}
        />
      ))}
    </section>
  );
}
