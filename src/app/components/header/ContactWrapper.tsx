"use client";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/app/locales/client";

export default function ContactWrapper({ locale }: { locale: string }) {
  const t = useI18n();
  return (
    <Link href={`/${locale}/contanct`} className="flex items-center gap-1">
      <Image src="/contact.svg" width={30} height={30} alt="contact icon" />
      <h1>{t("contact")}</h1>
    </Link>
  );
}
