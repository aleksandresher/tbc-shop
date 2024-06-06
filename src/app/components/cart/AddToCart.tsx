"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function AddToCart({
  productId,
  product_type,
}: {
  productId: number;
  product_type: string;
}) {
  const queryClient = useQueryClient();

  const addToCart = async () => {
    console.log("Attempting to add to cart");
    console.log("productId:", productId);
    console.log("product_type:", product_type);
    const response = await fetch("/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, product_type }),
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
            { id: Math.random(), productId, product_type, quantity: 1 },
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
      className="border border-gray-300 rounded-lg w-[100px] mt-2 p-1"
      onClick={() => clickHandler()}
    >
      Add to Cart
    </button>
  );
}
