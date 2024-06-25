"use client";
import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/app/locales/client";
import StoreIcon from "../svg/StoreIcon";

export default function ShopWrapper({ locale }: { locale: string }) {
  const t = useI18n();
  return (
    <Link href={`/${locale}/shop`}>
      <section className="flex items-center gap-0">
        <StoreIcon />
        {/* <Image src="/storelast.svg" width={50} height={50} alt="contact icon" /> */}
        <h1>{t("store")}</h1>
      </section>
    </Link>
  );
}
