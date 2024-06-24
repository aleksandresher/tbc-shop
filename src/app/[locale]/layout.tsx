import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { I18nProviderClient } from "../locales/client";
import { ReactNode } from "react";
import ReactQueryProvider from "../providers/ReactQueryProvider";
import MainProvider from "../providers/SessionProvider";
import HeaderWrapper from "../components/header/HeaderWrapper";
const inter = Inter({ subsets: ["latin"] });
import { CartProvider } from "../providers/ContextProvider";
import { ThemeProvider } from "../providers/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import MobileHeader from "../components/header/MobileHeader";
import FooterWrapper from "../components/footer/FooterWrapper";

export const metadata: Metadata = {
  title: "Cosmetics Store",
  description:
    "Discover top cosmetics and skincare products from brands like Avene, Nuxe, and Isispharma. Shop now for the best in beauty and skincare.",
  icons: {
    icon: "/favicon-32x32.png",
  },
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
    <html lang={locale} suppressContentEditableWarning suppressHydrationWarning>
      <body className="flex flex-col min-h-screen relative bg-[#f1f3f8] dark:bg-[#000]">
        <ReactQueryProvider>
          <I18nProviderClient locale={locale}>
            <MainProvider>
              <CartProvider>
                <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                  disableTransitionOnChange
                >
                  <MobileHeader locale={locale} />
                  <HeaderWrapper locale={locale} />
                  <main className="flex-1  mt-16 md:mt-0 ">{children}</main>

                  <FooterWrapper locale={locale} />

                  <Toaster />
                </ThemeProvider>
              </CartProvider>
            </MainProvider>
          </I18nProviderClient>
        </ReactQueryProvider>
      </body>
    </html>
  );
}

