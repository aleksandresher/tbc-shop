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
  const [language, setLanguage] = useState(locale);
  const { data, isLoading, error } = useQuery<CartResponse>({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section className="w-[600px] flex flex-col gap-2">
      <h1 className="font-bold">Shopping cart</h1>

      <div className="flex gap-5">
        <p>You have {data?.items?.length} item(s) in your cart</p>
      </div>
      <div className="flex flex-col gap-3">
        {data?.items?.map((cartItem) => (
          <div
            key={cartItem.cart_id}
            className="grid grid-cols-5 items-center border border-gray-400 rounded-lg p-3"
          >
            {/* <h2>
              {
                cartItem.languages[locale as keyof typeof cartItem.languages]
                  .title
              }
            </h2> */}
            <span className="flex items-center gap-2 justify-center">
              <DecreaseButton
                productId={cartItem.product_id}
                quantity={cartItem.quantity}
              />
              <p>{cartItem.quantity}</p>
              <IncreaseButton productId={cartItem.product_id} />
            </span>

            <span className="flex justify-center">
              ${Number(cartItem.languages.en.price) * cartItem.quantity}
            </span>
            <DeleteButton product_id={cartItem.product_id} />
            <FullProductOnHover locale={locale} cartItem={cartItem} />
          </div>
        ))}
      </div>
      <Link href={`dashboard/payment`}>
        <button>Checkout</button>
      </Link>
      {/* <StripeProductList /> */}
      <StripeProducts />
    </section>
  );
}
