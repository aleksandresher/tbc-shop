"use client";

import { useQuery } from "@tanstack/react-query";
import { getCart } from "@/services/func";
import DecreaseButton from "./DecreaseBtn";
import IncreaseButton from "./IncreaseBtn";
import DeleteButton from "./DeleteBtn";
import { useState, useEffect } from "react";
import Image from "next/image";
import FullProductOnHover from "./FullProductOnHover";
import Link from "next/link";
import StripeProducts from "./StripeProducts";
import StripeProductList from "../stripe/StripeProductList";
import BeatLoader from "react-spinners/BeatLoader";
import { useI18n } from "@/app/locales/client";
import { useCart } from "@/app/providers/ContextProvider";

interface CartItem {
  cart_id: number;
  product_id: number;
  quantity: number;
  added_at: string; // You may want to convert this to a Date type if needed
  image: string;
  numberofvotes: number;
  totalvotes: number;
  size: string;
  languages: {
    en: LanguageDetails;
    ka: LanguageDetails;
  };
}

interface LanguageDetails {
  title: string;
  category: string;
  country: string;
  brand: string;
  sdescription: string;
  ldescription: string;
  price: number;
  currency: string;
}

interface CartResponse {
  items: CartItem[];
}

export default function Cart({ locale }: { locale: string }) {
  const t = useI18n();
  const { setItemCount } = useCart();
  const [language, setLanguage] = useState(locale);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { data, isLoading, error } = useQuery<CartResponse>({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });

  useEffect(() => {
    if (data?.items) {
      setItemCount(data.items.length);

      // Calculate total price
      const totalPrice = data.items.reduce(
        (accumulator, currentItem) =>
          accumulator + currentItem.quantity * getPrice(currentItem, locale),
        0
      );
      setTotalPrice(totalPrice);
    }
  }, [data, setItemCount, locale]);

  function getPrice(item: CartItem, locale: string): number {
    return item.languages[locale as keyof typeof item.languages].price;
  }

  if (isLoading) {
    return <BeatLoader />;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section className=" w-[300px] md:w-[750px] flex flex-col gap-2 p-4 md:p-8">
      <div className="flex gap-5 items-end mb-5">
        <h1 className="font-bold text-2xl">{t("shoppingBag")}</h1>
        <p>
          {data?.items?.length} {t("items")}
        </p>
      </div>
      <div className="flex flex-col gap-4 ">
        {data?.items?.map((cartItem) => (
          <div
            key={cartItem.cart_id}
            className="flex flex-col md:flex-row justify-between p-4 border  border-b-2 dark:bg-[#1c1c1e]"
          >
            <div className="w-full md:w-1/4 flex justify-center bg-[#f1f3f6] mb-3">
              <Image
                src={cartItem.image}
                alt={
                  cartItem.languages[locale as keyof typeof cartItem.languages]
                    .title
                }
                width={200}
                height={150}
                className="w-[200px] h-[150px]"
              />
            </div>

            <span className="w-full md:w-3/4 flex flex-col px-3 gap-3  ">
              <div className="flex flex-col w-[200px] md:flex-row md:w-full  md:justify-between md:items-center h-1/2 ">
                <div className="w-full flex flex-col md:flex-row gap-3">
                  <h1>
                    {
                      cartItem?.languages[
                        locale as keyof typeof cartItem.languages
                      ].brand
                    }
                  </h1>
                  <h2 className=" font-bold">
                    {
                      cartItem?.languages[
                        locale as keyof typeof cartItem.languages
                      ].title
                    }
                  </h2>
                </div>
                <div className="flex gap-1">
                  <span className="flex justify-center">
                    {
                      cartItem?.languages[
                        locale as keyof typeof cartItem.languages
                      ].price
                    }
                  </span>
                  <p>
                    {
                      cartItem.languages[
                        locale as keyof typeof cartItem.languages
                      ].currency
                    }
                  </p>
                </div>
              </div>

              <span className="flex justify-between items-center  h-1/2 mt-4">
                {" "}
                <span className="flex items-center gap-1">
                  <DecreaseButton
                    productId={cartItem.product_id}
                    quantity={cartItem.quantity}
                  />
                  <p>{cartItem.quantity}</p>
                  <IncreaseButton productId={cartItem.product_id} />
                </span>
                <DeleteButton product_id={cartItem.product_id} />
              </span>
            </span>
          </div>
        ))}
      </div>
      <span className="flex flex-col gap-4 justify-between md:flex-row md:gap-0 ">
        <div className="flex items-center w-3/4 gap-4 px-4 ">
          <h2 className=" text-md md:text-xl">{t("totalPrice")}:</h2>
          <span className="flex gap-1">
            <p className="text-md md:text-xl">{totalPrice}</p>
            <p className="text-md md:text-xl">
              {locale === "ka" ? "GEL" : "USD"}
            </p>
          </span>
        </div>
        <StripeProducts />
      </span>
    </section>
  );
}
