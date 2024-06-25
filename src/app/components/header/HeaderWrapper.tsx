import CartWrapper from "../cart/CartWrapper";
import Search from "../search/Search";
import BlogWrapper from "./BlogWrapper";
import LocaleChange from "../language/LocalChange";
import AuthorizationWrapper from "../authorization/AuthorizationWrapper";
import ContactWrapper from "./ContactWrapper";
import ShopWrapper from "./ShopWrapper";
import Link from "next/link";
import SearchWrapper from "../search/SearchWrapper";
import { ModeToggle } from "../ThemeToggle";

export default function HeaderWrapper({ locale }: { locale: string }) {
  return (
    <section
      className="hidden sm:w-full md:grid bg-[#fae9f2]  py-4 dark:bg-[#70294a]"
      style={{ gridTemplateColumns: "3fr 2fr 1fr" }}
    >
      <span className=" flex items-center md:justify-end gap-10 col-span-1">
        <Link href={`/${locale}`}>
          <h1 className="hidden sm:block font-bold text-lg font-tbc-regular">
            Beauty Bounty
          </h1>
        </Link>
        <SearchWrapper locale={locale} />
      </span>

      <span className="hidden sm:flex gap-6 justify-end  items-center ">
        <ShopWrapper locale={locale} />
        <BlogWrapper locale={locale} />
        <ContactWrapper locale={locale} />
      </span>

      <span className="flex gap-4 justify-start sm:justify-end pr-10 items-center">
        <ModeToggle />
        <LocaleChange />
        <AuthorizationWrapper locale={locale} />
        <CartWrapper locale={locale} />
      </span>
    </section>
  );
}
