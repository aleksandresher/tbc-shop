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
              <Link href={`/${locale}/shop/skincare`}> {t("category")}</Link>
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
    </section>
  );
}
