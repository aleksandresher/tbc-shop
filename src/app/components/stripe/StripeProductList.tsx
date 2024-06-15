"use client";
import { useQuery } from "@tanstack/react-query";
import { getStripeProducts } from "@/services/func";

export default function StripeProductList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["stripelist"],
    queryFn: () => getStripeProducts(),
  });

  if (isLoading) {
    <div>is loading</div>;
  }
  if (error) {
    <div>{error.message}</div>;
  }
  return <section>{JSON.stringify(data)}</section>;
}
