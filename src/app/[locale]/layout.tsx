import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { I18nProviderClient } from "../locales/client";
import { ReactNode } from "react";
import ReactQueryProvider from "../providers/ReactQueryProvider";
import MainProvider from "../providers/SessionProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

interface PageProps {
  children: ReactNode;
  params: {
    locale: string;
  };
}
export default function RootLayout({
  children,
  params: { locale },
}: PageProps) {
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <ReactQueryProvider>
          <I18nProviderClient locale={locale}>
            <MainProvider>{children}</MainProvider>
          </I18nProviderClient>
        </ReactQueryProvider>
      </body>
    </html>
  );
}

