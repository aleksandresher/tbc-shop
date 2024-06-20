"use client";
import Image from "next/image";
import { ModeToggle } from "../ThemeToggle";
import { useRouter } from "next/navigation";

import { useState } from "react";
import Search from "../search/Search";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { useI18n } from "@/app/locales/client";

export default function MobileHeader({ locale }: { locale: string }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  console.log("menu", menuOpen);
  const t = useI18n();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <section className="sm:hidden relative">
      <section className="py-5 px-8 grid grid-cols-5 items-center">
        <span onClick={() => toggleMenu()}>
          <svg
            className="block h-5 w-5 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Mobile menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </span>

        <h1 className=" col-span-3 text-center">Beauty Bounty</h1>
        <span className="flex gap-3 ">
          {" "}
          <Image src="/search2.svg" alt="search icon" width={30} height={50} />
          <Image src="/basket.svg" alt="basket icon" width={30} height={30} />
        </span>
      </section>
      {menuOpen && (
        <section className="h-screen w-full flex flex-col absolute gap-4 top-0 px-8 py-5 bg-[#fff] z-50">
          <div className="flex w-full justify-between pl-1">
            <h1>Beauty</h1>
            <ModeToggle />
            <span onClick={() => toggleMenu()}>
              <Image
                src="/close.svg"
                alt="menu close icon"
                width={20}
                height={20}
              />
            </span>
          </div>
          <Search locale={locale} />
          <nav>
            <ul className="flex flex-col gap-4 pl-2">
              <li>
                <Link href={"/shop"} onClick={() => toggleMenu()}>
                  {t("store")}
                </Link>
              </li>
              <li>
                <Link href={"/blog"} onClick={() => toggleMenu()}>
                  {t("blog")}
                </Link>
              </li>
              <li>
                <Link href={"/contact"} onClick={() => toggleMenu()}>
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </nav>
        </section>
      )}
    </section>
  );
}
