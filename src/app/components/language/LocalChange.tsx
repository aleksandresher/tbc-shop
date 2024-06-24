"use client";
import Image from "next/image";
import { useChangeLocale, useCurrentLocale } from "../../locales/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LanguageIcon from "../svg/LanguageIcon";

export default function LocaleChange() {
  const changeLocale = useChangeLocale();
  const locale = useCurrentLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <LanguageIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" bg-gray-100 z-50">
        <DropdownMenuItem className="hover:text-black">
          <button onClick={() => changeLocale("en")}>English</button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button onClick={() => changeLocale("ka")}>Georgian</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
