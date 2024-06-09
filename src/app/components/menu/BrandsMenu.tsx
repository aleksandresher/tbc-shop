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

export function BrandsMenu({ locale }: { locale: string }) {
  return (
    <section className="w-full">
      {" "}
      <NavigationMenu className="bg-black w-full">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-white hover:text-white focus:text-white">
              New
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
              Brands
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px]  lg:grid-cols-1">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/"
                      className="hover:underline hover:underline-offset-2"
                    >
                      The Ordinary
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/"
                      className="hover:underline hover:underline-offset-2"
                    >
                      ISISPHARMA
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/"
                      className="hover:underline hover:underline-offset-2"
                    >
                      AAVRANI
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-white hover:text-white focus:text-white">
              <Link href={`/${locale}/shop/skincare`}> Skincare</Link>
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
              <Link href={`/${locale}/shop/hair`}> Hair</Link>
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
              <Link href={`/${locale}/shop/body`}> Bath & Body</Link>
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
