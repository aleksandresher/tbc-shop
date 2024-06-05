"use client";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "@/services/func";
import DecreaseButton from "./DecreaseBtn";
import IncreaseButton from "./IncreaseBtn";
import DeleteButton from "./DeleteBtn";

interface ItemProps {
  cart_id: number;
  title: string;
  description: string;
  price: string;
  category: string;
  quantity: number;
  product_id: number;
}

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
    <section className="w-[400px] flex flex-col gap-2">
      <h1 className=" font-bold">Shopping cart</h1>
      {JSON.stringify(data)}
      <p>You have {data?.items?.length} item in your cart</p>
      <div className="flex flex-col gap-3">
        {data?.items?.map((cartItem: ItemProps) => (
          <div
            key={cartItem.cart_id}
            className="grid grid-cols-4 items-center border border-gray-400 rounded-lg p-3"
          >
            <h2>{cartItem.title}</h2>
            <span className="flex items-center gap-2 justify-center">
              <DecreaseButton
                productId={cartItem.product_id}
                quantity={cartItem.quantity}
              />
              <p>{cartItem.quantity}</p>
              <IncreaseButton productId={cartItem.product_id} />
            </span>

            <span className="flex justify-center">
              ${Number(cartItem.price) * cartItem.quantity}
            </span>
            <DeleteButton product_id={cartItem.product_id} />
          </div>
        ))}
      </div>
    </section>
  );
}
