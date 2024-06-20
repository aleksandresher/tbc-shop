"use client";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/app/locales/client";
import ContactIcon from "../svg/ContactIcon";

export default function ContactWrapper({ locale }: { locale: string }) {
  const t = useI18n();
  return (
    <Link href={`/${locale}/contact`} className="flex items-center gap-1">
      <ContactIcon />
      <h1>{t("contact")}</h1>
    </Link>
  );
}
