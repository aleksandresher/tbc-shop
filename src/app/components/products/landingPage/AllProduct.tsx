"use client";
import { useQuery } from "@tanstack/react-query";
import { getAllProduct } from "@/services/func";
import SingleProductCard from "../card/SingleProductCard";

interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
}

export default function AllProduct() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["allproducts"],
    queryFn: () => getAllProduct(),
  });

  if (isLoading) {
    <div>is loading</div>;
  }
  if (error) {
    <div>{error.message}</div>;
  }

  return (
    <section className="grid grid-cols-4 gap-3">
      {data?.map((item: Product) => (
        <SingleProductCard item={item} key={item.id} />
      ))}
    </section>
  );
}
