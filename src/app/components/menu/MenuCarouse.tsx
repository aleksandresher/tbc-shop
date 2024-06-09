import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";

export default function MenuCarousel() {
  return (
    <Carousel
      opts={{
        // align: "start",
        slidesToScroll: 2,
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent className="flex gap-2 px-3">
        <CarouselItem
          key={1}
          className="flex justify-center items-center basis-1/3 h-[50px] border border-gray-200"
        >
          <Link href="/">New</Link>
        </CarouselItem>
        <CarouselItem
          key={2}
          className="flex justify-center items-center basis-1/3 h-[50px] border border-gray-200"
        >
          <Link href="">Brands</Link>
        </CarouselItem>
        <CarouselItem
          key={3}
          className="flex justify-center items-center basis-1/3 h-[50px] border border-gray-200"
        >
          <Link href="">Skincare</Link>
        </CarouselItem>
        <CarouselItem
          key={4}
          className="flex justify-center items-center basis-1/3 h-[50px] border border-gray-200"
        >
          <Link href="">Hair</Link>
        </CarouselItem>
        <CarouselItem
          key={5}
          className="flex justify-center items-center basis-1/3 h-[50px] border border-gray-200"
        >
          <Link href="">Bath & Body</Link>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
