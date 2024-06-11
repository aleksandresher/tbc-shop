import { BrandsMenu } from "./BrandsMenu";
import MenuCarousel from "./MenuCarouse";

export default function MenuWraper({ locale }: { locale: string }) {
  return (
    <section>
      <div className="hidden sm:block">
        <BrandsMenu locale={locale} />
      </div>
      <div className="sm:hidden">
        <MenuCarousel />
      </div>
    </section>
  );
}