import PopularProductsSkeleton from "./PopularProductSkeleton";
import ProductListSkeleton from "./ProductListSkeleton";

export default function SingleProductSkeleton() {
  return (
    <section className="flex flex-col items-center md:px-14 bg-white">
      <section className="w-full flex flex-col md:flex-row gap-3 px-4  py-6">
        <div className="w-full px-8 md:px-0 md:w-1/3 h-[400px] bg-[#f1f3f6] animate-pulse"></div>
        <div className="w-full md:py-8 flex flex-col md:w-2/3 bg-[#ffffff] animate-pulse gap-6 px-8">
          <h1 className="bg-[#f1f3f6] animate-pulse h-[60px]"></h1>
          <p className="h-[100px] animate-pulse bg-[#f1f3f6]"></p>
          <div className="h-[60px] w-[200px] bg-white animate-pulse"></div>
        </div>
      </section>
      <div className="w-4/5 md:w-full h-[80px] px-14 bg-[#f1f3f6] animate-pulse"></div>
      <ProductListSkeleton itemNumber={4} />
    </section>
  );
}
