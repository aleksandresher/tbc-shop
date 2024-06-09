import { BrandsMenu } from "./BrandsMenu";
import MenuCarousel from "./MenuCarouse";

export default function MenuWraper() {
  return (
    <section>
      <div className="hidden sm:block">
        <BrandsMenu />
      </div>
      <div className="sm:hidden">
        <MenuCarousel />
      </div>
    </section>
  );
}
