import HeaderWrapper from "@/app/components/header/HeaderWrapper";
import { ReactNode } from "react";

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
        {children}
      </main>
    </section>
  );
}
