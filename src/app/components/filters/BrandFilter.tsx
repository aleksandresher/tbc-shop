import { ChangeEvent, useState } from "react";
import { useI18n } from "@/app/locales/client";

interface FilterProps {
  setBrandFilter: (brand: string) => void;
  clearFilter: () => void;
}

export default function BrandFilterSelect({
  setBrandFilter,
  clearFilter,
}: FilterProps) {
  const t = useI18n();

  const handleBrandChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "All" || e.target.value === "ყველა") {
      clearFilter();
    } else {
      setBrandFilter(e.target.value.toLowerCase());
    }
  };

  return (
    <form className="">
      <select
        onChange={handleBrandChange}
        id="countries"
        className="bg-gray-50 border border-gray-300 text-black text-sm  focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-[10px] z-30"
      >
        <option value={t("all")}>{t("all")}</option>
        <option value={t("isispharma")}>{t("isispharma")}</option>
        <option value={t("avene")}>{t("avene")}</option>
        <option value={t("nuxe")}>{t("nuxe")}</option>
        <option value={t("fanola")}>{t("fanola")}</option>
        <option value={t("caudalie")}>{t("caudalie")}</option>
        <option value={t("rituals")}>{t("rituals")}</option>
        <option value={t("topicream")}>{t("topicream")}</option>
      </select>
    </form>
  );
}
