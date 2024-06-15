"use client";
import { useQuery } from "@tanstack/react-query";
import { getCart, getStripeProducts } from "@/services/func";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CartItem {
  stripe_product_id: string;
  quantity: number;
}

interface StripeProduct {
  id: string;
  product: string;
}

interface ProductWithQuantity {
  id: string;
  quantity: number;
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

  const [filteredProducts, setFilteredProducts] = useState<
    ProductWithQuantity[]
  >([]);

  useEffect(() => {
    if (cartData?.items && stripeProducts) {
      const arrayOfIdsWithQuantity = cartData.items.map((item) => ({
        stripe_product_id: item.stripe_product_id,
        quantity: item.quantity,
      }));

      const updatedProducts: ProductWithQuantity[] = arrayOfIdsWithQuantity
        .map(({ stripe_product_id, quantity }) => {
          const product = stripeProducts.find(
            (p) => p.product === stripe_product_id
          );
          return product ? { id: product.id, quantity } : null;
        })
        .filter((product): product is ProductWithQuantity => product !== null);

      setFilteredProducts(updatedProducts);
    }
  }, [cartData, stripeProducts]);

  console.log("Filtered Products with Quantity:", filteredProducts);

  const handlePayment = async () => {
    try {
      const response = await fetch(`/api/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: filteredProducts,
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
      <h1>
        Filtered Products with Quantity: {JSON.stringify(filteredProducts)}
      </h1>
      <button onClick={handlePayment}>Buy</button>
    </section>
  );
}
