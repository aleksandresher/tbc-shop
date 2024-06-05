"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function IncreaseButton({ productId }: { productId: number }) {
  const queryClient = useQueryClient();
  let userId = "";
  if (typeof window !== "undefined") {
    userId = localStorage.getItem("userId") || "";
  }

  const increaseQuantity = async (productId: number) => {
    const response = await fetch("/api/cart/increase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, userId }),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to increase quantity! HTTP status: ${response.status}`
      );
    }

    return response.json();
  };

  const mutation = useMutation({
    mutationFn: () => increaseQuantity(productId),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["cart"], (oldData: any) => {
        const updatedItems = oldData.items.map((item: any) => {
          if (item.productId === productId) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        return { items: updatedItems };
      });
    },
    onError: (err) => {
      console.error("Error increasing quantity:", err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={() => handleClick()}
      className="bg-[#8b878b33] p-2 h-[20px] flex justify-center items-center rounded-md"
    >
      +
    </button>
  );
}
