"use client";
import { useState } from "react";
import Image from "next/image";
import RateProduct from "../RateProduct";

export default function Single() {
  return (
    <section className="grid grid-cols-4">
      {" "}
      <section className="flex flex-col items-center border border-gray-200 p-3  mb-8">
        <div className="w-[200px] h-[230px] flex justify-center items-center relative overflow-hidden">
          <Image
            src="https://res.cloudinary.com/dlku11fhn/image/upload/v1718015093/isispharma1_b91s32.png"
            fill={true}
            alt="oidinaru"
            className=" object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="flex flex-col mt-2">
          <h1>The Ordinary</h1>
          <p>Mini Glycolic Acid 7% Toner</p>

          <p className="font-bold">$6.00</p>
        </div>
        <RateProduct productId={4} category="body" />
      </section>
      <section className="flex flex-col items-center border border-gray-200   mb-8">
        <div className="w-[200px] h-[230px] flex justify-center items-center relative overflow-hidden">
          <Image
            src="https://res.cloudinary.com/dlku11fhn/image/upload/v1718015965/hair1_ibkr5m.webp"
            alt="oidinaru"
            fill={true}
            className=" object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="flex flex-col mt-2">
          <h1>The Ordinary</h1>
          <p>Mini Glycolic Acid 7% Toner</p>

          <p className="font-bold">$6.00</p>
        </div>
        <RateProduct productId={3} category="body" />
      </section>
      <section className="flex flex-col items-center border border-gray-200 mb-8">
        <div className="w-[200px] h-[230px] flex justify-center items-center relative overflow-hidden">
          <Image
            src="https://res.cloudinary.com/dlku11fhn/image/upload/v1717839136/Custom_Shopify_Size-245_400x_nwuk6d.webp"
            fill={true}
            alt="oidinaru"
            className=" object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="flex flex-col mt-2">
          <h1>The Ordinary</h1>
          <p>Mini Glycolic Acid 7% Toner</p>

          <p className="font-bold">$6.00</p>
        </div>
        <RateProduct productId={3} category="body" />
      </section>
      <section className="flex flex-col items-center border border-gray-200 p-2  ">
        <div className="w-[200px] h-[230px] flex justify-center items-center relative overflow-hidden">
          {" "}
          <Image
            src="https://res.cloudinary.com/dlku11fhn/image/upload/v1718020068/skin8_lwm1eh.webp"
            fill={true}
            alt="oidinaru"
            className=" object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="flex flex-col mt-2">
          <h1>The Ordinary</h1>
          <p>Mini Glycolic Acid 7% Toner</p>

          <p className="font-bold">$6.00</p>
        </div>
        <RateProduct productId={3} category="body" />
      </section>
    </section>
  );
}
