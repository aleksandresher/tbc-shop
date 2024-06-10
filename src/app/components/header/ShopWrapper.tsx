"use client";
import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/app/locales/client";

export default function ShopWrapper({ locale }: { locale: string }) {
  const t = useI18n();
  return (
    <Link href={`/${locale}/shop`}>
      <section className="flex items-center gap-1">
        <Image src="/store.svg" width={30} height={30} alt="store icon" />
        <h1>{t("store")}</h1>
      </section>
    </Link>
  );
}
