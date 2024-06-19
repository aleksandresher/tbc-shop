"use client";
import { useState } from "react";

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

export default function MobileMenu({ locale }: { locale: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useI18n();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <section className="w-full absolute top-0">
      <button
        onClick={toggleMenu}
        aria-controls="nav"
        aria-expanded={menuOpen}
        aria-label="mobile navigation toggle"
        className="absolute z-50 right-10 cursor-pointer flex flex-col h-6 justify-between w-6 transition-transform duration-300 ease-out"
      >
        <div
          className={`bg-gray-400 rounded-sm h-[3px] w-full transition-transform duration-300 ease-[cubic-bezier(0.54,-0.81,0.57,0.57)] transform origin-right ${
            menuOpen ? "rotate-[-90deg] translate-x-1" : ""
          }`}
        ></div>
        <div className="bg-gray-400 rounded-sm h-[3px] w-full"></div>
        <div
          className={`bg-gray-400 rounded-sm h-[3px] w-[50%] transition-transform duration-300 ease-[cubic-bezier(0.54,-0.81,0.57,0.57)] transform origin-left ${
            menuOpen ? "rotate-[-90deg] -translate-x-1" : ""
          } self-end`}
        ></div>
      </button>
      {menuOpen && (
        <NavigationMenu className="bg-black w-full ">
          <NavigationMenuList className="flex flex-col">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-white hover:text-white focus:text-white">
                {t("brands")}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="">
                <ul className="grid gap-3 p-4 md:w-[400px]  lg:grid-cols-2 grid-rows-3 left-full">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        href={`/${locale}/shop`}
                        className="hover:underline hover:underline-offset-2"
                      >
                        {t("all")}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        href={`/${locale}/shop?brand=${t("ordinary")}`}
                        className="hover:underline hover:underline-offset-2"
                      >
                        {t("ordinary")}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        href={`/${locale}/shop?brand=${t("isispharma")}`}
                        className="hover:underline hover:underline-offset-2"
                      >
                        {t("isispharma")}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        href={`/${locale}/shop?brand=${t("nuxe")}`}
                        className="hover:underline hover:underline-offset-2"
                      >
                        {t("nuxe")}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        href={`/${locale}/shop?brand=${t("fanola")}`}
                        className="hover:underline hover:underline-offset-2"
                      >
                        {t("fanola")}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        href={`/${locale}/shop?brand=${t("avene")}`}
                        className="hover:underline hover:underline-offset-2"
                      >
                        {t("avene")}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        href={`/${locale}/shop?brand=${t("echosline")}`}
                        className="hover:underline hover:underline-offset-2"
                      >
                        {t("echosline")}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        href={`/${locale}/shop?brand=${t("svr")}`}
                        className="hover:underline hover:underline-offset-2"
                      >
                        {t("svr")}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        href={`/${locale}/shop?brand=${t("mizon")}`}
                        className="hover:underline hover:underline-offset-2"
                      >
                        {t("mizon")}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-white hover:text-white focus:text-white">
                {t("category")}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px]  lg:grid-cols-1">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        href={`/${locale}/shop?category=${t("queryskin")}`}
                        className="hover:underline hover:underline-offset-2 tracking-wide"
                      >
                        {t("skin")}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        href={`/${locale}/shop?category=${t("queryhair")}`}
                        className="hover:underline hover:underline-offset-2 tracking-wide"
                      >
                        {t("hair")}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        href={`/${locale}/shop?category=${t("querybody")}`}
                        className="hover:underline hover:underline-offset-2 tracking-wide"
                      >
                        {t("body")}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )}
    </section>
  );
}
