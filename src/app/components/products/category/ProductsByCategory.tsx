"use client";
import { useQuery } from "@tanstack/react-query";
import { getByCategory } from "@/services/func";
import RelatedProductCard from "../card/RelatedCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Link from "next/link";
import Image from "next/image";
import AddToCart from "../../cart/AddToCart";

interface LanguageObject {
  title: string;
  category: string;
  country: string;
  brand: string;
  sdescription: string;
  ldescription: string;
  price: number;
  currency: string;
  totalvotes: number;
  numberofvotes: number;
  image: string;
}

interface Product {
  product_id: number;
  languages: {
    en: LanguageObject;
    ka: LanguageObject;
  };
}

interface DataType {
  products: Product[];
}
export default function ProductsByCategory({
  category,
  locale,
}: {
  category: string;
  locale: string;
}) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,

    arrows: false,
  };
  const { data, isLoading, error } = useQuery<DataType>({
    queryKey: ["productByCategory", category],
    queryFn: () => getByCategory({ category }),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data || data.products.length === 0) {
    return null; // Return null if no data or no products
  }
  return (
    <>
      <section className="sm:hidden">
        <Slider {...settings} className="sm:hidden">
          {data.products.map((item: Product) => {
            const selectedLanguage =
              locale === "ka" ? item.languages.ka : item.languages.en;
            const averageRating =
              item.languages.en.totalvotes > 0
                ? item.languages.en.totalvotes / item.languages.en.numberofvotes
                : 0;

            return (
              <div key={item.product_id} className="sm:hidden">
                <Link href={`shop/${item.product_id}`}>
                  <div className="w-full flex flex-col items-center  ">
                    <div className="w-[300px] h-[300px] md:w-[350px] flex justify-center items-center relative">
                      <Image
                        src={selectedLanguage.image}
                        width={300}
                        height={300}
                        alt={selectedLanguage.title}
                        className="object-cover md:w-[300px]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) "
                        priority={true}
                      />
                    </div>
                    <div className="w-4/5 flex flex-col items-center gap-1">
                      <p className=" text-sm text-center  font-tbc-medium">
                        {selectedLanguage.title}
                      </p>
                    </div>
                    <div className="flex items-center mt-3 gap-2">
                      <div className="flex justify-center items-center gap-1 "></div>
                    </div>
                  </div>
                </Link>
                <span className="flex w-full justify-center">
                  <AddToCart productId={item.product_id} />
                </span>
              </div>
            );
          })}
        </Slider>
      </section>

      <section className="hidden mt-3 sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-4">
        {data.products.map((item: Product) => {
          const selectedLanguage =
            locale === "ka" ? item.languages.ka : item.languages.en;
          const averageRating =
            item.languages.en.totalvotes > 0
              ? item.languages.en.totalvotes / item.languages.en.numberofvotes
              : 0;

          return (
            <RelatedProductCard
              key={item.product_id}
              productId={item.product_id}
              image={selectedLanguage.image}
              averageRating={averageRating}
              totalVotes={selectedLanguage.totalvotes}
              title={selectedLanguage.title}
            />
          );
        })}
      </section>
    </>
  );
}
