"use client";
import Image from "next/image";
import { getLocalePath } from "@/utils/getLocalePath";

import AddToCart from "../../cart/AddToCart";
import Link from "next/link";
import ImageHoverCard from "./ImageHover";
import { Rating } from "react-simple-star-rating";

export default function Single({
  item,
  productId,
  locale,
}: {
  item: any;
  productId: number;
  locale: string;
}) {
  const avarageRating = item.totalvotes / item.numberofvotes;

  // <Link href={getLocalePath(locale, "/shop")}>
  return (
    <section className="flex flex-col items-center border-b-2 border-[#ecb8ec55] bg-[#fff]  dark:border dark:border-white-1 rounded-[4px] dark:bg-[#1c1c1e] p-3">
      {/* <Link href={`shop/${productId}`}> */}
      <Link href={getLocalePath(locale, `/shop/${productId}`)}>
        <div className="w-full flex flex-col items-center  ">
          <div className="w-[300px] h-[300px] lg:w-[350px] flex justify-center items-center relative">
            <Image
              src={item.image}
              width={300}
              height={300}
              alt={item.title}
              className="object-cover md:w-[300px]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) "
              priority={true}
            />
          </div>
          <div className="w-full flex flex-col items-center gap-1">
            <h1 className="text-base font-tbc-medium">{item.brand}</h1>
            <p className="w-4/5 h-[40px] lg:w-full text-sm text-center font-tbc-medium">
              {item.title}
            </p>
          </div>
          <div className="flex items-center mt-3 gap-2">
            <div className="flex justify-center items-center gap-1 ">
              <p className="font-tbc-bold text-red-600">
                {item.currency == "USD" ? "$" : "₾"}
              </p>
              <p className=" font-tbc-bold">{item.price}.00</p>
            </div>
            <div className="flex justify-center items-center">
              <p className=" font-tbc-regular">
                {item.size}
                {locale === "ka" ? "მლ" : "ml"}
              </p>
            </div>
          </div>
        </div>
      </Link>
      <section className="flex p-2 gap-1 items-center">
        <div className="App">
          <Rating
            initialValue={avarageRating}
            className="hidden"
            size={20}
            readonly={true}
          />
        </div>
        <div className="flex gap-1 items-center pt-2">
          <p className="text-sm">{avarageRating ? avarageRating : null}</p>
          <p className="text-sm">({item.numberofvotes})</p>
        </div>
      </section>

      <AddToCart productId={productId} />
    </section>
  );
}
