import HeaderWrapper from "../components/header/HeaderWrapper";
import MenuWraper from "../components/menu/MenuWrapper";

import { BrandsMenu } from "../components/menu/BrandsMenu";

export default function Home({ params }: { params: { locale: string } }) {
  console.log("locale from homme", params.locale);
  return (
    <section>
      <HeaderWrapper locale={params.locale} />
      <MenuWraper />

      {/* <AllProduct /> */}
      {/* <CategoryWrapper locale={params.locale} /> */}
    </section>
  );
}
