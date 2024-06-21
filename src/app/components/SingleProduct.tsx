"use client";
import { useQuery } from "@tanstack/react-query";
import { loadSingle } from "@/services/func";
import Image from "next/image";
import { useI18n } from "../locales/client";
import ImageHoverCard from "./products/card/ImageHover";
import { Rating } from "react-simple-star-rating";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
const URL = process.env.NEXT_PUBLIC_BASE_URL;

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

export default function SingleProductPageCard({
  id,
  locale,
}: {
  id: string;
  locale: string;
}) {
  const [rating, setRating] = useState(0);
  const queryClient = useQueryClient();
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

  const avarageRating = data[0].totalvotes / data[0].numberofvotes;

  const handleRating = async (rate: number) => {
    setRating(rate);
    try {
      const response = await fetch(`${URL}/api/product/rate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: data[0].product_id,
          rating: rate,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to rate product");
      }

      const productData = await response.json();
      queryClient.invalidateQueries({ queryKey: ["SingleProduct"] });
      console.log("Product rated successfully:", productData);
    } catch (error) {
      console.error("Error rating product:", error);
    }
  };

  return (
    <section className="w-full flex justify-center px-12">
      <div className="w-4/5 product-card px-4 pt-8 border border-red-700">
        {/* <ImageHoverCard
          image={selectedLanguage.image}
          title={selectedLanguage.title}
        /> */}
        <span className="flex items-center p-2 gap-1 sm:gap-4">
          <Image
            src={selectedLanguage.image}
            alt={selectedLanguage.title}
            width={200}
            height={250}
            priority={true}
            className="w-[180px] border border-gray-100 shadow-md sm:w-[400px] sm:h-[500px]"
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

            <div className="flex items-center justify-center gap-1">
              <div className="App">
                <Rating
                  onClick={handleRating}
                  initialValue={avarageRating}
                  className="hidden"
                  size={20}
                />
              </div>
              <span className="flex gap-1 items-center">
                <p className="text-sm">
                  {avarageRating ? avarageRating : null}
                </p>
                <p className="text-sm">({data[0]?.totalvotes})</p>
              </span>
            </div>
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
