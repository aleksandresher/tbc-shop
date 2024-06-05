"use client";
import Link from "next/link";

export default function CategoryWrapper({ locale }: { locale: string }) {
  return (
    <section className="flex gap-5">
      <Link href={`http://localhost:3000/${locale}/shop/face`}>
        Face Products
      </Link>
      <Link href={`http://localhost:3000/${locale}/shop/body`}>
        Body Products
      </Link>
    </section>
  );
}
