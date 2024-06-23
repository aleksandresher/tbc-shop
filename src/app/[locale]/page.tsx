import Gallery from "../components/landing/Gallery";
import PartnersSlider from "../components/landing/PartnersSlider";
import MostPopularProduct from "../components/landing/MostPopular";
import BlogsGallery from "../components/landing/Blogs";

export default function Home({ params }: { params: { locale: string } }) {
  return (
    <section className="dark:bg-black">
      <Gallery />

      <MostPopularProduct locale={params.locale} />
      <BlogsGallery locale={params.locale} />
      {/* <div className="px-14 mb-6 mt-6">
        <h3 className=" text-2xl">Partner Brands</h3>
      </div> */}
      {/* <PartnersSlider /> */}
    </section>
  );
}
