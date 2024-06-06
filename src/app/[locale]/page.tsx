import LocaleChange from "../components/language/LocalChange";
import AuthorizationWrapper from "../components/authorization/AuthorizationWrapper";
import AllProduct from "../components/products/landingPage/AllProduct";
import CategoryWrapper from "../components/categories/CategoryWrapper";
import CartWrapper from "../components/cart/CartWrapper";

export default function Home({ params }: { params: { locale: string } }) {
  console.log("locale from homme", params.locale);
  return (
    <main className="flex flex-col gap-4 justify-end px-12 py-4  ">
      <span className="flex gap-3 justify-end">
        <CartWrapper locale={params.locale} />
        <LocaleChange />
        <AuthorizationWrapper locale={params.locale} />
      </span>

      <AllProduct />
      <CategoryWrapper locale={params.locale} />
    </main>
  );
}
