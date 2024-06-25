"use client";
import { useQuery } from "@tanstack/react-query";
import { getCart, getStripeProducts } from "@/services/func";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const URL = process.env.NEXT_PUBLIC_BASE_URL;
import { useI18n } from "@/app/locales/client";
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
  const t = useI18n();
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

  const handlePayment = async () => {
    try {
      const response = await fetch(`${URL}/api/payment`, {
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

      if (url === `${URL}/en/dashboard/payment/success` && cartData?.items) {
        await saveOrder(cartData?.items);
      }

      router.push(`${url}`);
    } catch (error) {
      console.error("Error in payment:", error);
    }
  };
  const saveOrder = async (items: CartItem[]) => {
    try {
      const response = await fetch(`/api/orders/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save order");
      }

      console.log("Order saved successfully");
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };
  return (
    <section className="flex   md:py-4 justify-center  ">
      <button
        onClick={handlePayment}
        className=" border-2 px-5 py-2 dark:text-white dark:bg-black font-bold"
      >
        {t("checkout")}
      </button>
    </section>
  );
}
