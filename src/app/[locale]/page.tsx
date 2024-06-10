import HeaderWrapper from "../components/header/HeaderWrapper";
import MenuWraper from "../components/menu/MenuWrapper";
import Gallery from "../components/landing/CategorySlidesWrapper";
// import Single from "../components/products/card/Single";

export default function Home({ params }: { params: { locale: string } }) {
  console.log("locale from homme", params.locale);
  return (
    <section>
      <HeaderWrapper locale={params.locale} />
      <MenuWraper locale={params.locale} />
      <Gallery />

      {/* <AllProduct /> */}
      {/* <CategoryWrapper locale={params.locale} /> */}
      {/* <Single /> */}
    </section>
  );
}
