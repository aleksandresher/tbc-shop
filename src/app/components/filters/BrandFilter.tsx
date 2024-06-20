"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useI18n } from "@/app/locales/client";

interface FilterProps {
  setBrandFilter: (brand: string) => void;
  clearFilter: () => void;
}

export default function BrandFilterSelect({
  setBrandFilter,
  clearFilter,
}: FilterProps) {
  const handleBrandChange = (brand: string) => {
    if (brand === "All" || brand === "ყველა") {
      clearFilter();
    } else {
      setBrandFilter(brand.toLowerCase());
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("propagation stopod");
  };
  const t = useI18n();
  return (
    <Select onValueChange={handleBrandChange}>
      <SelectTrigger className="rounded-[10px] outline-none border border-gray-200 relative">
        <SelectValue placeholder={`${t("brands")}`} />
      </SelectTrigger>
      <SelectContent className=" bg-red-900 z-50">
        <SelectItem
          value={t("all")}
          onClick={(e) => handleClick(e)}
          className="focus:bg-slate-200 "
        >
          {t("all")}
        </SelectItem>
        <SelectItem
          value={t("isispharma")}
          onClick={(e) => handleClick(e)}
          className="focus:bg-slate-200"
        >
          {t("isispharma")}
        </SelectItem>
        <SelectItem
          value={t("avene")}
          onClick={handleClick}
          className="focus:bg-slate-200 cursor-pointer"
        >
          {t("avene")}
        </SelectItem>
        <SelectItem
          value={t("echosline")}
          onClick={handleClick}
          className="focus:bg-slate-200 cursor-pointer"
        >
          {t("echosline")}
        </SelectItem>
        <SelectItem
          value={t("nuxe")}
          onClick={handleClick}
          className="focus:bg-slate-200 cursor-pointer"
        >
          {t("nuxe")}
        </SelectItem>
        <SelectItem
          value={t("svr")}
          onClick={handleClick}
          className="focus:bg-slate-200 cursor-pointer"
        >
          {t("svr")}
        </SelectItem>
        <SelectItem
          value={t("phyto")}
          onClick={handleClick}
          className="focus:bg-slate-200 cursor-pointer"
        >
          {t("phyto")}
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
