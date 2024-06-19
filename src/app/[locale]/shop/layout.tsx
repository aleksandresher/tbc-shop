import HeaderWrapper from "@/app/components/header/HeaderWrapper";
import { ReactNode } from "react";
import MobileHeader from "@/app/components/header/MobileHeader";

interface ShopLayoutProps {
  children: ReactNode;
  params: {
    locale: string;
  };
}

export default function ShopLayout({ params, children }: ShopLayoutProps) {
  return (
    <section>
      <main>
        <HeaderWrapper locale={params.locale} />
        <MobileHeader locale={params.locale} />
        {children}
      </main>
    </section>
  );
}
