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
}

export default function BrandFilterSelect({ setBrandFilter }: FilterProps) {
  const handleBrandChange = (brand: string) => {
    setBrandFilter(brand.toLowerCase());
  };
  const t = useI18n();
  return (
    <Select onValueChange={handleBrandChange}>
      <SelectTrigger className="w-[180px] rounded-[10px] outline-none border border-gray-200">
        <SelectValue placeholder={`${t("brands")}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          value={t("isispharma")}
          className="focus:bg-slate-200 cursor-pointer"
        >
          {t("isispharma")}
        </SelectItem>
        <SelectItem
          value={t("avene")}
          className="focus:bg-slate-200 cursor-pointer"
        >
          {t("avene")}
        </SelectItem>
        <SelectItem
          value={t("echosline")}
          className="focus:bg-slate-200 cursor-pointer"
        >
          {t("echosline")}
        </SelectItem>
        <SelectItem
          value={t("nuxe")}
          className="focus:bg-slate-200 cursor-pointer"
        >
          {t("nuxe")}
        </SelectItem>
        <SelectItem
          value={t("svr")}
          className="focus:bg-slate-200 cursor-pointer"
        >
          {t("svr")}
        </SelectItem>
        <SelectItem
          value={t("phyto")}
          className="focus:bg-slate-200 cursor-pointer"
        >
          {t("phyto")}
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
