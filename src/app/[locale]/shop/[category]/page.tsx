"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { loadProductsByCategory } from "@/services/func";
// import GeneralCard from "@components/GeneralCard";
import SingleProductCard from "@/app/components/products/card/SingleProductCard";

type FaceProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  amount: number;
  user_id: number;
};

type BodyProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  user_id: number;
};

export default function GenericCategory() {
  const params = useParams();

  const category = typeof params.category === "string" ? params.category : "";
  console.log("category", category);

  type DataType = typeof category extends "face"
    ? FaceProduct[]
    : typeof category extends "body"
    ? BodyProduct[]
    : any[];

  const { data, isLoading, error } = useQuery<DataType>({
    queryKey: ["generic"],
    queryFn: () => loadProductsByCategory({ category }),
  });

  return (
    <section className="w-full flex justify-center px-12">
      <h1>Category page</h1>

      <div className="w-11/12 flex gap-3">
        {/* <div className="">
          <SideBarSelector category={category} />
        </div> */}
        <div className="w-4/5 flex-grow">
          <div className=" grid grid-cols-4 gap-4 ">
            {data?.map((item) => {
              return <SingleProductCard item={item} key={item._id} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
