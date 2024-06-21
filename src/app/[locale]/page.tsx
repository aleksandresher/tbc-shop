import Gallery from "../components/landing/CategorySlidesWrapper";
import HeaderWrapper from "../components/header/HeaderWrapper";

export default function Home({ params }: { params: { locale: string } }) {
  return (
    <section className="dark:bg-black">
      <Gallery />
    </section>
  );
}
