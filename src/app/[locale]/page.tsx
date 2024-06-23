import Gallery from "../components/landing/Gallery";
import PartnersSlider from "../components/landing/PartnersSlider";
import MostPopularProduct from "../components/landing/MostPopular";

export default function Home({ params }: { params: { locale: string } }) {
  return (
    <section className="dark:bg-black">
      <Gallery />
      <div className="px-14 mb-6 mt-6">
        <h2 className=" text-2xl">Popular Products</h2>
      </div>
      <MostPopularProduct locale={params.locale} />
      {/* <div className="px-14 mb-6 mt-6">
        <h3 className=" text-2xl">Partner Brands</h3>
      </div> */}
      {/* <PartnersSlider /> */}
    </section>
  );
}
