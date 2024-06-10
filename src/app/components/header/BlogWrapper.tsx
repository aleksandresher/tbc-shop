"use client";
import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/app/locales/client";

export default function BlogWrapper({ locale }: { locale: string }) {
  const t = useI18n();
  return (
    <Link href={`/${locale}/blog`}>
      <section className="flex items-center gap-1">
        <Image src="/blog.svg" width={30} height={30} alt="blog icon" />
        <h1>{t("blog")}</h1>
      </section>
    </Link>
  );
}
