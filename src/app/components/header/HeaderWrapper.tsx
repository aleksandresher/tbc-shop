import CartWrapper from "../cart/CartWrapper";
import Search from "../search/Search";
import BlogWrapper from "./BlogWrapper";
import LocaleChange from "../language/LocalChange";
import AuthorizationWrapper from "../authorization/AuthorizationWrapper";
import ContactWrapper from "./ContactWrapper";
import ShopWrapper from "./ShopWrapper";

export default function HeaderWrapper({ locale }: { locale: string }) {
  return (
    <section
      className="w-full grid  py-4 "
      style={{ gridTemplateColumns: "3fr 1fr 1fr" }}
    >
      <span className=" flex items-center md:justify-end gap-10 col-span-1">
        <h1 className="hidden sm:block font-bold text-lg">Care</h1>
        <Search />
      </span>

      <span className="hidden sm:flex gap-4 justify-end items-center ">
        <ShopWrapper locale={locale} />
        <BlogWrapper locale={locale} />
        <ContactWrapper locale={locale} />
      </span>

      <span className="flex gap-4 justify-start sm:justify-end pr-10 items-center">
        <LocaleChange />
        <AuthorizationWrapper locale={locale} />
        <CartWrapper locale={locale} />
      </span>
    </section>
  );
}
