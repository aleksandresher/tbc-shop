"use client";
import Image from "next/image";
import Link from "next/link";

export default function CartWrapper({ locale }: { locale: string }) {
  let userId = "";
  if (typeof window !== "undefined") {
    userId = localStorage.getItem("userId") || "";
  }
  return (
    <Link href={`${locale}/cart/${userId}`}>
      <Image src="/cart.svg" width={30} height={30} alt="cart icon" />
    </Link>
  );
}
