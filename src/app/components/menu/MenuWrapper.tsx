import { BrandsMenu } from "./BrandsMenu";
import MenuCarousel from "./MenuCarouse";
import MobileMenu from "./MobileMenu";

export default function MenuWraper({ locale }: { locale: string }) {
  return (
    <section>
      <div className="hidden sm:block">
        <BrandsMenu locale={locale} />
      </div>
      <div className="sm:hidden">
        <MobileMenu locale={locale} />
        {/* <MenuCarousel /> */}
      </div>
    </section>
  );
}
