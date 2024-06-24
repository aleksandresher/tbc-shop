"use client";
import { useQuery } from "@tanstack/react-query";
import { loadSingle } from "@/services/func";
import Image from "next/image";
import { useI18n } from "../locales/client";
import ImageHoverCard from "./products/card/ImageHover";
import { Rating } from "react-simple-star-rating";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import AddToCart from "./cart/AddToCart";
import ProductsByCategory from "./products/category/ProductsByCategory";
import SocialShareWrapper from "./products/share/SocialShare";
const URL = process.env.NEXT_PUBLIC_BASE_URL;
import SingleProductSkeleton from "./skeletons/SingleProductSkeleton";

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
    return <SingleProductSkeleton />;
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

  const itemUrl = `https://tbc-shop.vercel.app/en/shop/${data[0].product_id}`;

  return (
    <section className="w-full flex justify-center  px-4 dark:bg-[#1c1c1e]">
      <div className="w-full md:w-11/12 px-3 md:px-8   rounded-[10px] py-8 bg-[#fff] dark:bg-[#1c1c1e]">
        <span className="flex flex-col md:flex-row justify-center p-2 gap-1 sm:gap-8">
          <Image
            src={selectedLanguage?.image}
            alt={selectedLanguage.title}
            width={200}
            height={250}
            priority={true}
            className="w-full h-[250px]  shadow-md sm:w-[400px] sm:h-[500px] border border-[#ecb8ec55] "
          />
          <section className=" pt-5 flex flex-col items-start px-6 justify-start gap-2">
            <span className="flex flex-col md:flex-row items-center gap-2">
              <h1 className="text-center font-tbc-regular text-2xl">
                {selectedLanguage.title} -
              </h1>
              <h2 className="font-tbc-regular text-xl">
                {selectedLanguage.brand}
              </h2>
            </span>
            <p>
              {selectedLanguage.currency === "USD" ? "$" : "₾"}
              {selectedLanguage.price}.00
            </p>
            <div className="flex items-center justify-center gap-1 mt-5 mb-4">
              <div className="App">
                <Rating
                  onClick={handleRating}
                  initialValue={avarageRating}
                  className="hidden"
                  size={20}
                  fillColor="#fff dark:#000"
                />
              </div>
              <span className="flex gap-1 items-center">
                <p className="text-sm">
                  {avarageRating ? avarageRating : null}
                </p>
                <p className="text-sm">({data[0]?.totalvotes})</p>
              </span>
            </div>
            <span className="w-full">
              <p className="font-tbc-regular">
                {selectedLanguage.sdescription}
              </p>
            </span>

            <AddToCart productId={data[0]?.product_id} />
            <span className="flex flex-col mt-4">
              <p className="font-tbc-bold">{t("category")}</p>
              <p className=" capitalize">{selectedLanguage.category}</p>
            </span>

            <span className="flex flex-col mt-4">
              <p className="font-tbc-bold">{t("country")}</p>
              <p className="capitalize">{selectedLanguage.country}</p>
            </span>
            <SocialShareWrapper itemUrl={itemUrl} />
          </section>
        </span>

        <span className="w-full py-10 flex flex-col px-6">
          <p className="font-tbc-bold"> {t("ldescription")}</p>
          <p className=" font-tbc-regular">{selectedLanguage.ldescription}</p>
        </span>

        <div className="w-full py-10  flex flex-col gap-3 px-6">
          <h3 className="font-tbc-bold">{t("relatedProducts")}</h3>
          <ProductsByCategory
            category={selectedLanguage.category}
            locale={locale}
          />
        </div>
      </div>
    </section>
  );
}
