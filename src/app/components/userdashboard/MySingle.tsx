"use client";
import { useState } from "react";
import Image from "next/image";
import MyRate from "./MyRate";
import EditMyProduct from "./MyEdit";

interface LanguageObject {
  title: string;
  category: string;
  country: string;
  brand: string;
  sdescription: string;
  ldescription: string;
  price: number;
  currency: string;
  image: string;
  numberofvotes: number;
  totalvotes: number;
  size: number;
}

interface FullLanguages {
  en: LanguageObject;
  ka: LanguageObject;
}
interface MySingleProps {
  item: LanguageObject;
  fullLanguages: FullLanguages;
  productId: number;
}
export default function MySingle({
  item,
  fullLanguages,
  productId,
}: MySingleProps) {
  return (
    <section className="flex flex-col gap-3  border border-gray-200 p-3  mb-8">
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

      <span className="flex flex-col ">
        <h1>Brand: {item.brand}</h1>

        <p>Title: {item.title}</p>
      </span>

      <span className="flex">
        <p className="font-bold"> {item.currency == "USD" ? "$" : "₾"}</p>
        <p className="font-bold">{item.price}.00</p>
      </span>

      <MyRate amount={item.numberofvotes} total={item.totalvotes} />
      <span className="flex gap-2 pt-4">
        <EditMyProduct wholeItem={fullLanguages} productId={productId} />
        <Image
          src="/delete.svg"
          width={30}
          height={30}
          alt="delete button"
          className=""
        />
      </span>
    </section>
  );
}