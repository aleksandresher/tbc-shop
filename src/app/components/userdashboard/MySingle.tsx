"use client";
import { useState } from "react";
import Image from "next/image";
import MyRate from "./MyRate";
import EditMyProduct from "./MyEdit";
import DeleteProduct from "../products/delete/DeleteProduct";

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
  image: string;
  size: number;
  totalvotes: number;
  fullLanguages: FullLanguages;
  productId: number;
  numberofvotes: number;
}
export default function MySingle({
  item,
  fullLanguages,
  productId,
  image,
  size,
  totalvotes,
  numberofvotes,
}: MySingleProps) {
  return (
    <section className="flex flex-col gap-3  rounded-[4px] border-2 dark:border-none dark:bg-[#1c1c1e] p-3  mb-8">
      <div className="w-[200px] h-[230px] flex justify-center items-center relative overflow-hidden">
        <Image
          src={image}
          width={300}
          height={300}
          alt={item.title}
          className="object-cover md:w-[300px]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) "
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

      <p>Rating: {numberofvotes}</p>
      <p>Total: {totalvotes}</p>

      <span className="flex gap-2 pt-4">
        <EditMyProduct
          wholeItem={fullLanguages}
          productId={productId}
          size={size}
          image={image}
        />
        <DeleteProduct productId={productId} />
      </span>
    </section>
  );
}
