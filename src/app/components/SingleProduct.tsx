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
      <div className="w-4/5 product-card px-4 pt-8 rounded-[10px] bg-[#fff]">
        {/* <ImageHoverCard
          image={selectedLanguage.image}
          title={selectedLanguage.title}
        /> */}
        <span className="flex justify-center p-2 gap-1 sm:gap-4">
          <Image
            src={selectedLanguage.image}
            alt={selectedLanguage.title}
            width={200}
            height={250}
            priority={true}
            className="w-[180px] border border-gray-100 shadow-md sm:w-[400px] sm:h-[500px]"
          />
          <section className="w-1/2 pt-5 flex flex-col items-start px-6 justify-start gap-2">
            <span className="flex items-center gap-2">
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
                  fillColor="#000"
                />
              </div>
              <span className="flex gap-1 items-center">
                <p className="text-sm">
                  {avarageRating ? avarageRating : null}
                </p>
                <p className="text-sm">({data[0]?.totalvotes})</p>
              </span>
            </div>
            <p className="font-tbc-regular">{selectedLanguage.sdescription}</p>
            <AddToCart productId={data[0]?.product_id} />
            <span className="flex flex-col mt-4">
              <p className="font-tbc-bold">{t("category")}</p>
              <p className=" capitalize">{selectedLanguage.category}</p>
            </span>

            <span className="flex flex-col mt-4">
              <p className="font-tbc-bold">{t("country")}</p>
              <p className="capitalize">{selectedLanguage.country}</p>
            </span>
          </section>
        </span>

        <span className="w-full p-12 flex flex-col">
          <p className="font-tbc-bold"> {t("ldescription")}</p>
          <p className=" font-tbc-regular">{selectedLanguage.ldescription}</p>
        </span>

        <div className="w-full p-12 flex flex-col">
          <h3 className="font-tbc-bold">Related Products</h3>
          <ProductsByCategory
            category={selectedLanguage.category}
            locale={locale}
          />
          <div className="grid grid-col-1 sm:grid-col-2 md:grid-cols-4"></div>
        </div>
      </div>
    </section>
  );
}
