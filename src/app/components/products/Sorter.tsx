import { ChangeEvent, useState } from "react";
import { useI18n } from "@/app/locales/client";

interface ProductSortProps {
  onSortChange: (sortOption: string) => void;
}

export default function BrandFilterSelect({ onSortChange }: ProductSortProps) {
  const t = useI18n();

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    const sortOrder = selectedOption === t("priceDown") ? "down" : "up";
    console.log("sort set", sortOrder);
    onSortChange(sortOrder);
  };

  return (
    <form className="">
      <select
        onChange={handleSortChange}
        id="countries"
        className="bg-gray-50 border border-gray-300 text-black text-sm  focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-[10px]"
      >
        <option value={t("priceDown")}>{t("priceDown")}</option>
        <option value={t("priceUp")}>{t("priceUp")}</option>
      </select>
    </form>
  );
}
