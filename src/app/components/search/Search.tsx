"use client";
import Image from "next/image";
import { useI18n } from "@/app/locales/client";

export default function Search() {
  const t = useI18n();
  return (
    <div className="h-[50px]  sm:w-[250px] md:w-[400px]  flex border border-gray-300 rounded-[30px] bg-gray-50 placeholder-gray-700 focus:border-green-600 outline-none p-2">
      <Image src="/search2.svg" width={30} height={30} alt="search icon" />
      <form className="flex w-full">
        <input
          type="text"
          placeholder={t("search")}
          className="block  p-4  text-md text-gray-900 focus:outline-none"
        />
      </form>
    </div>
  );
}