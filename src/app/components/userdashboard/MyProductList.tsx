"use client";
import { useQuery } from "@tanstack/react-query";
import { getMyProducts } from "@/services/func";
import Single from "../products/card/Single";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
}

export default function MyProductList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["myproducts"],
    queryFn: () => getMyProducts(),
  });

  if (isLoading) {
    <div>is loading</div>;
  }
  if (error) {
    <div>{error.message}</div>;
  }

  return (
    <section className="grid grid-cols-4 gap-3">
      {JSON.stringify(data)}
      {/* {data?.map((item: Product) => (
        <SingleProductCard item={item} key={item.id} />
      ))} */}
    </section>
  );
}
