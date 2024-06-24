"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const URL = process.env.NEXT_PUBLIC_BASE_URL;
import { useI18n } from "@/app/locales/client";
import BasketIcon from "../svg/BasketIcon";

export default function AddToCart({ productId }: { productId: number }) {
  const queryClient = useQueryClient();
  const t = useI18n();

  const addToCart = async () => {
    const response = await fetch(`${URL}/api/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });

    if (!response.ok) {
      throw new Error("Failed to add product to cart");
    }

    return response.json();
  };

  const mutation = useMutation({
    mutationFn: addToCart,
    onMutate: async (newItem) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      const previousCart = queryClient.getQueryData<{ items: any[] }>(["cart"]);

      queryClient.setQueryData(
        ["cart"],
        (oldCart: { items: any[] } | undefined) => ({
          items: [
            ...(oldCart?.items || []),
            { id: Math.random(), productId, quantity: 1 },
          ],
        })
      );

      return { previousCart };
    },
    onError: (err, newItem, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cart"], context.previousCart);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const clickHandler = () => {
    mutation.mutate();
  };

  return (
    <button
      className="border bg-[#fff] border-black rounded-[4px] mt-2 px-6 py-2  text-sm dark:bg-black font-tbc-regular flex justify-center items-center "
      onClick={() => clickHandler()}
    >
      <div className="flex items-center gap-2">
        <BasketIcon />
        <span className=" flex items-center h-3">
          <p className=" leading-3 font-tbc-regular">{t("add")}</p>
        </span>
      </div>
    </button>
  );
}
