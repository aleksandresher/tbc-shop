"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAllProduct } from "@/services/func";
import Single from "@/app/components/products/card/Single";
import { useSearchParams } from "next/navigation";
import SearchWrapper from "@/app/components/search/SearchWrapper";
import BrandFilterSelect from "@/app/components/filters/BrandFilter";
import { useEffect, useState } from "react";
import ProductListSkeleton from "@/app/components/skeletons/ProductListSkeleton";
import ProductSort from "@/app/components/products/Sorter";

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
  const initialBrand = searchParams.get("brand")?.toLocaleLowerCase() || "";
  const initialCategory =
    searchParams.get("category")?.toLocaleLowerCase() || "";

  const [searchByBrand, setSearchByBrand] = useState(initialBrand);
  const [searchByCategory, setSearchByCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortedData, setSortedData] = useState<Product[]>([]);
  console.log("sorted data", sortedData);
  const { locale } = params;

  const { data, isLoading, error } = useQuery<DataType>({
    queryKey: ["generic"],
    queryFn: () => getAllProduct(),
  });

  useEffect(() => {
    const mappedData = Array.isArray(data)
      ? data.map((product) => ({
          product_id: product.product_id,
          languages:
            locale === "en" ? product.languages.en : product.languages.ka,
        }))
      : [];

    const filteredData = mappedData.filter((product) => {
      const brandMatch = searchByBrand
        ? product.languages.brand.toLowerCase() === searchByBrand
        : true;
      const categoryMatch = searchByCategory
        ? product.languages.category.toLowerCase() === searchByCategory
        : true;
      return brandMatch && categoryMatch;
    });

    const updatedSortedData = [...filteredData];
    if (sortBy === "up") {
      updatedSortedData.sort((a, b) => a.languages.price - b.languages.price);
    } else if (sortBy === "down") {
      updatedSortedData.sort((a, b) => b.languages.price - a.languages.price);
    }

    setSortedData(updatedSortedData);
  }, [data, sortBy, searchByBrand, searchByCategory, locale]);

  const clearFilter = () => {
    setSearchByBrand("");
  };

  const handleSortChange = (sortOption: string) => {
    setSortBy(sortOption);
  };
  if (isLoading) {
    return <ProductListSkeleton />;
  }

  return (
    <section className="flex  flex-col sm:flex-row justify-center gap-8 p-12 relative">
      <span className="flex justify-between items-center gap-4">
        <BrandFilterSelect
          setBrandFilter={setSearchByBrand}
          clearFilter={clearFilter}
        />
        <ProductSort onSortChange={handleSortChange} />
      </span>

      <div className=" gap-y-3 grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 md:gap-x-6 md:max-w-[1000px] md:min-w-[1000px]">
        {sortedData.length > 0 ? (
          sortedData.map((item) => (
            <Single
              locale={locale}
              item={item.languages}
              productId={item.product_id}
              key={item.product_id}
            />
          ))
        ) : (
          <div>No products found for the selected criteria.</div>
        )}
      </div>
    </section>
  );
}
