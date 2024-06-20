"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useI18n } from "@/app/locales/client";

export default function ProductSort() {
  const t = useI18n();
  return (
    <Select>
      <SelectTrigger className="rounded-[10px] outline-none border border-gray-200">
        <SelectValue placeholder={`${t("sort")}`} />
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectItem
          value={t("priceDown")}
          className="focus:bg-slate-200 cursor-pointer"
        >
          {t("priceDown")}
        </SelectItem>
        <SelectItem
          value={t("priceUp")}
          className="focus:bg-slate-200 cursor-pointer"
        >
          {t("priceUp")}
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
