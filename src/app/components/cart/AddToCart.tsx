"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
const URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function AddToCart({ productId }: { productId: number }) {
  const queryClient = useQueryClient();

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
      className="border bg-[#90e0ef] border-gray-300 rounded-[8px] mt-2 p-1 uppercase font-tbc-medium  "
      onClick={() => clickHandler()}
    >
      Add to Cart
    </button>
  );
}
