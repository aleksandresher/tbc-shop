import CartWrapper from "../cart/CartWrapper";
import Search from "../search/Search";
import BlogWrapper from "./BlogWrapper";
import LocaleChange from "../language/LocalChange";
import AuthorizationWrapper from "../authorization/AuthorizationWrapper";
import ContactWrapper from "./ContactWrapper";

export default function HeaderWrapper({ locale }: { locale: string }) {
  return (
    <section className="w-full flex py-4 ">
      <span className="w-1/2 flex items-center justify-end gap-10">
        <h1 className="hidden sm:block font-bold text-lg">Care</h1>
        <Search />
      </span>

      <span className="flex w-1/2  items-center justify-between">
        <span className="flex gap-4 w-1/2 justify-center ">
          <BlogWrapper locale={locale} />
          <ContactWrapper locale={locale} />
        </span>

        <span className="flex gap-4 justify-center w-1/2">
          <LocaleChange />
          <AuthorizationWrapper locale={locale} />
          <CartWrapper locale={locale} />
        </span>
      </span>
    </section>
  );
}
