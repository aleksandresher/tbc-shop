"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAllProduct } from "@/services/func";
import Single from "@/app/components/products/card/Single";

interface LanguageObject {
  title: string;
  category: string;
  country: string;
  brand: string;
  sdescription: string;
  ldescription: string;
  price: number;
  currency: string;
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

interface ParamsType {
  locale: string;
}

export default function GenericCategory({ params }: { params: ParamsType }) {
  const { locale } = params;

  const { data, isLoading, error } = useQuery<DataType>({
    queryKey: ["generic"],
    queryFn: () => getAllProduct(),
  });

  const filteredData = Array.isArray(data)
    ? data.map((product) => ({
        product_id: product.product_id,
        languages:
          locale === "en" ? product.languages.en : product.languages.ka,
      }))
    : [];
  console.log(filteredData);

  return (
    <section className="w-full flex justify-center px-12">
      <h1>Category page</h1>
      {/* <p>{JSON.stringify(data)}</p> */}
      {/* <p>{JSON.stringify(filteredData)}</p> */}

      <div className="w-11/12 flex gap-3">
        {/* <div className="">
          <SideBarSelector category={category} />
        </div> */}
        <div className="w-4/5 flex-grow">
          <div className=" grid grid-cols-4 gap-4 ">
            {filteredData?.map((item) => {
              return (
                <Single
                  item={item.languages}
                  productId={item.product_id}
                  key={item.product_id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
