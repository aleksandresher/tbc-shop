import LocaleChange from "../components/language/LocalChange";
import AuthorizationWrapper from "../components/authorization/AuthorizationWrapper";
import AllProduct from "../components/products/landingPage/AllProduct";
import CategoryWrapper from "../components/categories/CategoryWrapper";
import Cart from "../components/cart/Cart";
import CartWrapper from "../components/cart/CartWrapper";

export default function Home({ params }: { params: { locale: string } }) {
  return (
    <main className="flex flex-col gap-4 justify-end px-12 py-4  ">
      <span className="flex gap-3">
        <LocaleChange />
        <AuthorizationWrapper locale={params.locale} />
        <CartWrapper locale={params.locale} />
      </span>

      <AllProduct />
      <CategoryWrapper locale={params.locale} />
    </main>
  );
}
