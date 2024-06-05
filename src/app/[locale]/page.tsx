import LocaleChange from "../components/language/LocalChange";
import AuthorizationWrapper from "../components/authorization/AuthorizationWrapper";
import AllProduct from "../components/products/landingPage/AllProduct";

export default function Home({ params }: { params: { locale: string } }) {
  return (
    <main className="flex gap-4 justify-end px-12 py-4  ">
      <LocaleChange />
      <AuthorizationWrapper locale={params.locale} />
      <AllProduct />
    </main>
  );
}

