"use client";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "@/services/func";
import { cookies } from "next/headers";

export default function Cart() {
  let userId = "";
  if (typeof window !== "undefined") {
    userId = localStorage.getItem("userId") || "";
  }
  const { data, isLoading, error } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart({ userId }),
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {JSON.stringify(data)}
      {/* {data.items.map((item: any) => (
        <div key={item.cart_id}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <p>{item.price}</p>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))} */}
    </div>
  );
}
