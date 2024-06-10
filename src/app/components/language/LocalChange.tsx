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

export default function LocaleChange() {
  const changeLocale = useChangeLocale();
  const locale = useCurrentLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image
          src="/languageSwitcher.png"
          width={30}
          height={30}
          alt="language switcher"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-500 bg-slate-300">
        <DropdownMenuItem className="">
          <button onClick={() => changeLocale("en")}>English</button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          {" "}
          <button onClick={() => changeLocale("ka")}>Georgian</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
