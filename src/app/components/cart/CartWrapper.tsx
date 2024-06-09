"use client";
import Image from "next/image";
import Link from "next/link";

export default function CartWrapper({ locale }: { locale: string }) {
  return (
    <Link href={`${locale}/cart`}>
      <Image src="/basket.svg" width={30} height={30} alt="cart icon" />
    </Link>
  );
}
