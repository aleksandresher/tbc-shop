"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function CartWrapper({ locale }: { locale: string }) {
  const [cartUrl, setCartUrl] = useState(`${locale}/cart`);

  useEffect(() => {
    const userId = localStorage.getItem("userId") || "";
    setCartUrl(`${locale}/cart/${userId}`);
  }, [locale]);

  return (
    <Link href={cartUrl}>
      <Image src="/cart.svg" width={30} height={30} alt="cart icon" />
    </Link>
  );
}
