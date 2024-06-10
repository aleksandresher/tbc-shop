"use client";

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

export function BrandsMenu({ locale }: { locale: string }) {
  const t = useI18n();
  return (
    <section className="w-full">
      {" "}
      <NavigationMenu className="bg-black w-full">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-white hover:text-white focus:text-white">
              {t("new")}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-full grid gap-3 p-4 md:w-[400px]  lg:grid-cols-1">
                <li className="hover:underline hover:underline-offset-2">
                  <NavigationMenuLink asChild>
                    <Link href="/">All new</Link>
                  </NavigationMenuLink>
                </li>
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/"
                      className="hover:underline hover:underline-offset-2"
                    >
                      New SkinCare
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/"
                      className="hover:underline hover:underline-offset-2"
                    >
                      New Hair Care
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/"
                      className="hover:underline hover:underline-offset-2"
                    >
                      New Bath & Body
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-white hover:text-white focus:text-white">
              {t("brands")}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px]  lg:grid-cols-2 grid-rows-3">
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
              <Link href={`/${locale}/shop/skincare`}> {t("skincare")}</Link>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px]  lg:grid-cols-1">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/"
                      className="hover:underline hover:underline-offset-2"
                    >
                      Sunscreen
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/"
                      className="hover:underline hover:underline-offset-2"
                    >
                      Cleaners
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/"
                      className="hover:underline hover:underline-offset-2"
                    >
                      Masks
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-white hover:text-white focus:text-white">
              <Link href={`/${locale}/shop/hair`}> {t("hair")}</Link>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px]  lg:grid-cols-1">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/"
                      className="hover:underline hover:underline-offset-2"
                    >
                      Shampoo
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/"
                      className="hover:underline hover:underline-offset-2"
                    >
                      Conditioners
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/"
                      className="hover:underline hover:underline-offset-2"
                    >
                      Hair Oil
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-white hover:text-white focus:text-white">
              <Link href={`/${locale}/shop/body`}> {t("bath")}</Link>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px]  lg:grid-cols-1">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/"
                      className="hover:underline hover:underline-offset-2"
                    >
                      Body wash
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/"
                      className="hover:underline hover:underline-offset-2"
                    >
                      Shower gell
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/"
                      className="hover:underline hover:underline-offset-2"
                    >
                      Body oils
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </section>
  );
}
