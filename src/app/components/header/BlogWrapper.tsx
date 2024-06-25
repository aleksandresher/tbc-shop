"use client";
import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/app/locales/client";
import BlogIcon from "../svg/BlogIcon";

export default function BlogWrapper({ locale }: { locale: string }) {
  const t = useI18n();
  return (
    <Link href={`/${locale}/blog`}>
      <section className="flex items-center gap-2">
        {/* <BlogIcon /> */}
        <Image
          src="/blog-svgrepo-com.svg"
          width={30}
          height={30}
          alt="contact icon"
        />
        <h1>{t("blog")}</h1>
      </section>
    </Link>
  );
}
