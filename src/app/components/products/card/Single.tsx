"use client";
import { useState } from "react";
import Image from "next/image";
import RateProduct from "../RateProduct";

export default function Single() {
  return (
    <section className="flex flex-col border border-gray-200 p-3 w-[300px] mb-8">
      <Image
        src="https://res.cloudinary.com/dlku11fhn/image/upload/v1717965155/multi-beptide_omalm3.webp"
        width={250}
        height={250}
        alt="oidinaru"
      />
      <div className="flex flex-col mt-2">
        <h1>The Ordinary</h1>
        <p>Mini Glycolic Acid 7% Toner</p>

        <p className="font-bold">$6.00</p>
      </div>
      <RateProduct productId={3} category="body" />
    </section>
  );
}
