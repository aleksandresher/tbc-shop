import Footer from "./Footer";
export default function FooterWrapper({ locale }: { locale: string }) {
  return (
    <section className="">
      <Footer locale={locale} />
    </section>
  );
}
