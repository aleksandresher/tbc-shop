"use client";

import { useQuery } from "@tanstack/react-query";
import { getCart } from "@/services/func";
import DecreaseButton from "./DecreaseBtn";
import IncreaseButton from "./IncreaseBtn";
import DeleteButton from "./DeleteBtn";
import { useState } from "react";
import Image from "next/image";
import FullProductOnHover from "./FullProductOnHover";
import Link from "next/link";
import StripeProducts from "./StripeProducts";
import StripeProductList from "../stripe/StripeProductList";
import BeatLoader from "react-spinners/BeatLoader";
import { useI18n } from "@/app/locales/client";

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
  price: string; // You may want to convert this to a number type if needed
  currency: string;
}

interface CartResponse {
  items: CartItem[];
}

export default function Cart({ locale }: { locale: string }) {
  const t = useI18n();
  const [language, setLanguage] = useState(locale);
  const { data, isLoading, error } = useQuery<CartResponse>({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });

  if (isLoading) {
    return <BeatLoader />;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  // shoppingBag: "კალათა",
  // remove: "წაშლა",
  // proceedCheckout: "გადახდა",
  // items: "ნივთი",

  return (
    <section className=" w-[300px] md:w-[750px] flex flex-col gap-2 p-8">
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
            className="flex flex-col md:flex-row justify-between p-4 border  border-b-2"
          >
            <div className="w-full md:w-1/4 flex justify-center bg-[#f1f3f6] mb-3">
              <Image
                src={cartItem.image}
                alt={
                  cartItem.languages[locale as keyof typeof cartItem.languages]
                    .title
                }
                width={200}
                height={100}
                className="w-[200px] h-[150px]"
              />
            </div>

            <span className="w-full md:w-3/4 flex flex-col px-3  ">
              <div className="flex flex-col w-[200px] md:flex-row justify-between items-center h-1/2 ">
                <div className="flex flex-col md:flex-row gap-3">
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
                <div className=" self-end">
                  <DeleteButton product_id={cartItem.product_id} />
                </div>
              </div>
              {/* <div className="flex">
                <p>
                  {
                    cartItem.languages[
                      locale as keyof typeof cartItem.languages
                    ].price
                  }
                </p>
                <p>
                  {
                    cartItem.languages[
                      locale as keyof typeof cartItem.languages
                    ].currency
                  }
                </p>
              </div> */}
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
                <span className="flex justify-center">
                  {Number(cartItem.languages.en.price) * cartItem.quantity}
                </span>
              </span>
            </span>

            <span></span>

            {/* <FullProductOnHover locale={locale} cartItem={cartItem} />  */}
          </div>
        ))}
      </div>
      {/* <Link href={`dashboard/payment`}>
        <button>Checkout</button>
      </Link> */}
      {/* <StripeProductList /> */}
      {/* <StripeProducts /> */}
    </section>
  );
}
