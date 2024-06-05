"use client";
import { useQuery } from "@tanstack/react-query";
import { getAllProduct } from "@/services/func";

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

  return <section>{JSON.stringify(data)}</section>;
}
