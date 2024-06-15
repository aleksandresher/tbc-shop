"use client";
import { useQuery } from "@tanstack/react-query";
import { getStripeProducts } from "@/services/func";
import { CheckoutForm } from "../checkout/CheckoutForm";

export default function StripeProductList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["stripelqist"],
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
