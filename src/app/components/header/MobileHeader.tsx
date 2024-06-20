"use client";
import Image from "next/image";
import { ModeToggle } from "../ThemeToggle";

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
  const [menuOpen, setMenuOpen] = useState(false);
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
              <svg
                className="block h-5 w-5 fill-current "
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Mobile menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
              </svg>
            </span>
          </div>
          <Search locale={locale} />
          <span className="">
            <NavigationMenu className="w-[340px] sm:w-[600px] absolute">
              <NavigationMenuList className="flex flex-col items-start gap-3">
                <NavigationMenuItem className="top-0 ">
                  <NavigationMenuTrigger className="px-1 m-0 font-tbc-medium">
                    {t("brands")}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="top-0">
                    <ul className=" grid grid-col-2 gap-3 p-4   lg:grid-cols-2 grid-rows-3 right-full ease-in-out ">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            href={`/${locale}/shop`}
                            className="hover:underline hover:underline-offset-2 text-red-600"
                          >
                            {t("all")}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            href={`/${locale}/shop?brand=${t("rituals")}`}
                            className="hover:underline hover:underline-offset-2"
                          >
                            {t("rituals")}
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
                            href={`/${locale}/shop?brand=${t("caudalie")}`}
                            className="hover:underline hover:underline-offset-2"
                          >
                            {t("caudalie")}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="p-0 m-0 font-tbc-medium">
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
                <NavigationMenuItem>
                  <Link href={`/shop`} className=" font-tbc-medium">
                    Store
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href={`/contact`} className=" font-tbc-medium">
                    Contact
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href={`/blog`} className=" font-tbc-medium">
                    Blog
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </span>
        </section>
      )}
    </section>
  );
}
