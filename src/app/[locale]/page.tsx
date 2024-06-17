import HeaderWrapper from "../components/header/HeaderWrapper";
import MenuWraper from "../components/menu/MenuWrapper";
import Gallery from "../components/landing/CategorySlidesWrapper";
import SearchWrapper from "../components/search/SearchWrapper";
// import Single from "../components/products/card/Single";

export default function Home({ params }: { params: { locale: string } }) {
  return (
    <section>
      <MenuWraper locale={params.locale} />
      <Gallery />
      <SearchWrapper />
    </section>
  );
}
