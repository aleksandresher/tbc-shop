"use client";
import { useState } from "react";
import Image from "next/image";
import RateProduct from "../RateProduct";
import { join } from "path";
import AddToCart from "../../cart/AddToCart";
import Link from "next/link";
import ImageHoverCard from "./ImageHover";

export default function Single({
  item,
  productId,
  locale,
}: {
  item: any;
  productId: number;
  locale: string;
}) {
  return (
    <section className="flex flex-col items-center border-b-2 border-[#ecb8ec55] bg-[#fff]  dark:border dark:border-white-1 rounded-[4px] dark:bg-[#1c1c1e] p-3">
      <Link href={`shop/${productId}`}>
        <div className="w-full flex flex-col items-center  ">
          <div className="w-[300px] h-[300px] md:w-[350px] flex justify-center items-center relative">
            <Image
              src={item.image}
              width={300}
              height={300}
              alt="oidinaru"
              className="object-cover md:w-[300px]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) "
              priority={true}
            />
          </div>
          <div className="w-full flex flex-col items-center gap-1">
            <h1 className="text-base font-tbc-medium">{item.brand}</h1>
            <p className=" text-sm text-center font-tbc-medium">{item.title}</p>
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

      <RateProduct
        productId={productId}
        amount={item.numberofvotes}
        total={item.totalvotes}
      />
      <AddToCart productId={productId} />
    </section>
  );
}
