import MenuWraper from "../components/menu/MenuWrapper";
import Gallery from "../components/landing/CategorySlidesWrapper";
import SearchWrapper from "../components/search/SearchWrapper";
import HeaderWrapper from "../components/header/HeaderWrapper";
import MobileHeader from "../components/header/MobileHeader";
// import Single from "../components/products/card/Single";

export default function Home({ params }: { params: { locale: string } }) {
  return (
    <section>
      <HeaderWrapper locale={params.locale} />
      <MenuWraper locale={params.locale} />
      <Gallery />
    </section>
  );
}
