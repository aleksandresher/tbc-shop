"use client";
import { useQuery } from "@tanstack/react-query";
import { loadSingle } from "@/services/func";
import Image from "next/image";
import { useI18n } from "../locales/client";
import ImageHoverCard from "./products/card/ImageHover";

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
  const t = useI18n();
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
      <div className="product-card px-4 pt-8">
        <ImageHoverCard
          image={selectedLanguage.image}
          title={selectedLanguage.title}
        />
        <span className="flex items-center p-2 gap-1 sm:gap-4">
          <Image
            src={selectedLanguage.image}
            alt={selectedLanguage.title}
            width={200}
            height={250}
            priority={true}
            className="w-[180px] border border-gray-100 shadow-md sm:w-[300px]"
          />
          <section className="flex flex-col items-center gap-2">
            <h1 className="text-center font-tbc-regular">
              {selectedLanguage.title}
            </h1>
            <h2 className="font-tbc-regular">
              {t("brand")} {selectedLanguage.brand}
            </h2>
            <p className="font-tbc-regular">
              {t("category")}: {selectedLanguage.category}
            </p>
            <p className="font-tbc-regular">
              {t("country")}: {selectedLanguage.country}
            </p>
            <p>
              {t("price")}: {selectedLanguage.price} {selectedLanguage.currency}
            </p>
          </section>
        </span>

        <div className="flex flex-col gap-3 mt-5">
          {" "}
          <p className="font-tbc-regular">
            {t("anotation")}: {selectedLanguage.sdescription}
          </p>
          <p className=" font-tbc-regular">
            {t("ldescription")}: {selectedLanguage.ldescription}
          </p>
        </div>
      </div>
    </section>
  );
}
