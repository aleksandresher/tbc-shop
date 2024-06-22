"use client";
import Image from "next/image";
import { ModeToggle } from "../ThemeToggle";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import Search from "../search/Search";

import Link from "next/link";
import { useI18n } from "@/app/locales/client";
import LocaleChange from "../language/LocalChange";
import CartWrapper from "../cart/CartWrapper";
import AuthorizationWrapper from "../authorization/AuthorizationWrapper";

export default function MobileHeader({ locale }: { locale: string }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  console.log("menu", menuOpen);
  const t = useI18n();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
  }, [menuOpen]);

  return (
    <section className="md:hidden relative">
      <section className="py-5 px-8 grid grid-cols-5 items-center">
        <div className=" h-[60px] flex justify-center">
          <button
            className="flex flex-col justify-center items-center z-40"
            onClick={() => toggleMenu()}
            aria-label="toggle button"
          >
            <span
              className={`bg-black dark:bg-white block transition-all duration-300 ease-out 
                    h-0.5 w-6 rounded-sm ${
                      menuOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
                    }`}
            ></span>
            <span
              className={`bg-black dark:bg-white  block transition-all duration-300 ease-out 
                    h-0.5 w-6 rounded-sm my-0.5 ${
                      menuOpen ? "opacity-0" : "opacity-100"
                    }`}
            ></span>
            <span
              className={`bg-black dark:bg-white block transition-all duration-300 ease-out 
                    h-0.5 w-6 rounded-sm ${
                      menuOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
                    }`}
            ></span>
          </button>
        </div>

        <h1 className=" col-span-3 text-center">Beauty Bounty</h1>
        <span className="flex gap-3 items-center ">
          <CartWrapper locale={locale} />
          <AuthorizationWrapper locale={locale} />
        </span>
      </section>
      {menuOpen && (
        <section
          className={`h-screen w-full flex flex-col fixed top-20 right-0  gap-4 px-8 py-5 pt-8 bg-[#fff] dark:bg-black z-50 transition-transform duration-300 ease-out origin-left ${
            menuOpen ? "translate-x-0" : "translate-y-6"
          }`}
        >
          <Search locale={locale} toggleMenu={toggleMenu} />
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
          <div className="flex flex-col justify-center gap-2 pl-2">
            <ModeToggle />
            <LocaleChange />
          </div>
        </section>
      )}
    </section>
  );
}
