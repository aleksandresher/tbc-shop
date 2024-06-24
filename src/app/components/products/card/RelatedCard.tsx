"use client";
import Image from "next/image";

import AddToCart from "../../cart/AddToCart";
import Link from "next/link";
import ImageHoverCard from "./ImageHover";
import { Rating } from "react-simple-star-rating";

export default function RelatedProductCard({
  productId,
  image,
  averageRating,
  totalVotes,
  title,
  locale,
}: {
  productId: number;
  image: string;
  averageRating: number;
  totalVotes: number;
  title: string;
  locale: string;
}) {
  return (
    <section className="flex flex-col items-center border-b-2 border-[#ecb8ec55] bg-[#f1f3f6]  dark:border dark:border-white-1 rounded-[4px] dark:bg-[#1c1c1e] p-3">
      <Link href={`/${locale}/shop/${productId}`}>
        <div className="w-full flex flex-col items-center justify-between  ">
          <div className="w-[300px] h-[300px] md:w-[350px] flex justify-center items-center relative">
            <Image
              src={image}
              width={300}
              height={300}
              alt={title}
              className="object-cover md:w-[300px]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) "
              priority={true}
            />
          </div>
          <div className="w-4/5 h-[40px] flex flex-col items-center gap-1">
            <p className=" text-sm text-center  font-tbc-medium">{title}</p>
          </div>
        </div>
      </Link>

      <AddToCart productId={productId} />
    </section>
  );
}
