"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAllProduct } from "@/services/func";
import Single from "@/app/components/products/card/Single";
import { useSearchParams } from "next/navigation";

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

export default function GenericCategory({ params }: { params: ParamsType }) {
  const searchParams = useSearchParams();
  const searchByBrand = searchParams.get("brand");

  const { locale } = params;

  const { data, isLoading, error } = useQuery<DataType>({
    queryKey: ["generic"],
    queryFn: () => getAllProduct(),
  });

  const mappedData = Array.isArray(data)
    ? data.map((product) => ({
        product_id: product.product_id,
        languages:
          locale === "en" ? product.languages.en : product.languages.ka,
      }))
    : [];

  const filteredData = searchByBrand
    ? mappedData.filter(
        (product) => product.languages.brand.toLowerCase() === searchByBrand
      )
    : mappedData;

  return (
    <section className=" p-12 ">
      <div className=" grid grid-cols-4 gap-4 ">
        {filteredData?.map((item) => {
          return (
            <Single
              item={item.languages}
              productId={item.product_id}
              key={item.product_id}
            />
          );
        })}
      </div>
    </section>
  );
}
