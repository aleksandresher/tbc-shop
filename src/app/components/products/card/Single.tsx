"use client";
import { useState } from "react";
import Image from "next/image";
import RateProduct from "../RateProduct";
import { join } from "path";

export default function Single({
  item,
  productId,
}: {
  item: any;
  productId: number;
}) {
  return (
    <section className="flex flex-col items-center border border-gray-200 p-3  mb-8">
      <div className="w-[200px] h-[230px] flex justify-center items-center relative overflow-hidden">
        <Image
          src={item.image}
          fill={true}
          alt="oidinaru"
          className=" object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={true}
        />
      </div>

      <div className="flex flex-col mt-2">
        <span className="w-full flex">
          <h1>{item.brand}-</h1>
          <p> {item.title}</p>
        </span>

        <p className="font-bold">
          {item.currency == "USD" ? "$" : "₾"}
          {item.price}.00
        </p>
      </div>
      <RateProduct
        productId={productId}
        amount={item.numberofvotes}
        total={item.totalvotes}
      />
    </section>
  );
}
