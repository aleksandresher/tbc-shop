"use client";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/app/locales/client";
import ContactIcon from "../svg/ContactIcon";

export default function ContactWrapper({ locale }: { locale: string }) {
  const t = useI18n();
  return (
    <Link href={`/${locale}/contact`} className="flex items-center gap-2">
      {/* <Image src="/contact2.svg" width={30} height={30} alt="contact icon" /> */}
      <ContactIcon />
      <h1>{t("contact")}</h1>
    </Link>
  );
}
