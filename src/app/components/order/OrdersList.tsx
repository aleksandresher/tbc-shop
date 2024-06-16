"use client";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/services/func";

export default function OrderList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <section>
      <h1>Order list</h1>
      <p>{JSON.stringify(data)}</p>
    </section>
  );
}
