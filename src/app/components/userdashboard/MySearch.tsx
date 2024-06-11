"use client";
import Image from "next/image";
import { useI18n } from "@/app/locales/client";

export default function MySearch() {
  const t = useI18n();
  return (
    <div className="h-[40px]  sm:w-[150px] md:w-[250px]  flex border border-gray-300 rounded-[20px] bg-gray-50 placeholder-gray-700 focus:border-green-600 outline-none p-2">
      <Image src="/search2.svg" width={30} height={30} alt="search icon" />

      <input
        type="text"
        placeholder={t("search")}
        className="block h-[25px] w-[190px]   pl-2  text-md text-gray-900 focus:outline-none "
      />
    </div>
  );
}
