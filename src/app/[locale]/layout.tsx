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

export const metadata: Metadata = {
  title: "Cosmetics Store",
  description:
    "Discover top cosmetics and skincare products from brands like Avene, Nuxe, and Isispharma. Shop now for the best in beauty and skincare.",
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
      <body className={inter.className}>
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
                  <main> {children}</main>
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

