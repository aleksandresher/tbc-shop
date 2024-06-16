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
  image: string;
  numberofvotes: number;
  totalvotes: number;
  size: number;
  languages: {
    en: LanguageObject;
    ka: LanguageObject;
  };
}

interface MappedProduct {
  product_id: number;
  image: string;
  size: number;
  numberofvotes: number;
  totalvotes: number;
  fullLanguages: {
    en: LanguageObject;
    ka: LanguageObject;
  };
  filteredLanguage: LanguageObject;
}
interface DataType {
  items: Product[];
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
    return <div>Loading...</div>;
  }

  if (error || !data || !data.items) {
    return <div>Error: {error?.message || "Failed to fetch products"}</div>;
  }

  const mappedData: MappedProduct[] = data.items.map((product: Product) => ({
    product_id: product.product_id,
    image: product.image,
    size: product.size,
    numberofvotes: product.numberofvotes,
    totalvotes: product.totalvotes,
    fullLanguages: {
      en: product.languages.en || {
        title: "",
        category: "",
        country: "",
        brand: "",
        sdescription: "",
        ldescription: "",
        price: 0,
        currency: "",
        image: "",
        numberofvotes: 0,
        totalvotes: 0,
        size: 0,
      },
      ka: product.languages.ka || {
        title: "",
        category: "",
        country: "",
        brand: "",
        sdescription: "",
        ldescription: "",
        price: 0,
        currency: "",
        image: "",
        numberofvotes: 0,
        totalvotes: 0,
        size: 0,
      },
    },
    filteredLanguage:
      locale === "en" ? product.languages.en : product.languages.ka,
  }));

  console.log("mapped data", mappedData);
  console.log("data", data);
  return (
    <section className="grid grid-cols-4 gap-3">
      {mappedData?.map((item) => (
        <MySingle
          item={item.filteredLanguage}
          fullLanguages={item.fullLanguages}
          productId={item.product_id}
          image={item.image}
          size={item.size}
          numberofvotes={item.numberofvotes}
          totalvotes={item.totalvotes}
          key={item.product_id}
        />
      ))}
    </section>
  );
}
