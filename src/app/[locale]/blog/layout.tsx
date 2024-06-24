import HeaderWrapper from "@/app/components/header/HeaderWrapper";
import { ReactNode } from "react";

interface BlogLayoutProps {
  children: ReactNode;
  params: {
    locale: string;
  };
}
export default function BlogLayout({ params, children }: BlogLayoutProps) {
  return (
    <section>
      <main className="mt-4">{children}</main>
    </section>
  );
}
