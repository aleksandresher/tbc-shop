"use client";
import { useQuery } from "@tanstack/react-query";
import { getCart, getStripeProducts } from "@/services/func";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CartItem {
  stripe_product_id: string;
}

interface StripeProduct {
  id: string;
  product: string;
}

export default function StripeProducts() {
  const router = useRouter();
  const { data: cartData } = useQuery<{ items: CartItem[] }>({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });
  const { data: stripeProducts } = useQuery<StripeProduct[]>({
    queryKey: ["stripe"],
    queryFn: () => getStripeProducts(),
  });

  const [filteredProducts, setFilteredProducts] = useState<StripeProduct[]>([]);

  useEffect(() => {
    if (cartData && cartData.items && stripeProducts) {
      const arrayOfIds = cartData.items.map(
        (item: any) => item.stripe_product_id
      );

      const filteredProducts = stripeProducts.filter((product: any) =>
        arrayOfIds.includes(product.product)
      );

      setFilteredProducts(filteredProducts);
    }
  }, [cartData, stripeProducts]);

  const handlePayment = async () => {
    try {
      const idsToSend = filteredProducts.map((product) => product.id);
      const response = await fetch(`/api/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          arrayOfIds: idsToSend,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to pay");
      }

      const url = await response.json();

      router.push(`${url}`);
    } catch (error) {
      console.error("Error in payment:", error);
    }
  };

  return (
    <section>
      <h1>{JSON.stringify(filteredProducts)}</h1>
      {/* {JSON.stringify(arrayOfIds)} */}
      {/* <p>
        {(data[0].unit_amount / 100).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </p> */}
      <button onClick={() => handlePayment()}>Buy</button>
    </section>
  );
}
