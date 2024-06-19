"use client";
import { useState } from "react";
import Image from "next/image";
import RateProduct from "../RateProduct";
import { join } from "path";
import AddToCart from "../../cart/AddToCart";
import Link from "next/link";

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
    <section className="flex flex-col items-center border-b-2 border-[#ecb8ec55] sm:border border-gray-200 p-3">
      <Link href={`shop/${productId}`}>
        <div className="w-full flex flex-col items-center">
          <div className="w-[300px] h-[300px] flex justify-center items-center relative">
            <Image
              src={item.image}
              fill={true}
              alt="oidinaru"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
