import HeaderWrapper from "@/app/components/header/HeaderWrapper";
import { ReactNode } from "react";

interface ContactLayoutProps {
  children: ReactNode;
  params: {
    locale: string;
  };
}
export default function ContactLayout({
  params,
  children,
}: ContactLayoutProps) {
  return (
    <section>
      <main>
        <HeaderWrapper locale={params.locale} />
        {children}
      </main>
    </section>
  );
}
