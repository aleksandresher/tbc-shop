"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function DecreaseButton({
  productId,
  quantity,
}: {
  productId: number;
  quantity: number;
}) {
  const queryClient = useQueryClient();

  const decreaseQuantity = async () => {
    const response = await fetch(`${URL}/api/cart/decrease`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to decrease quantity! HTTP status: ${response.status}`
      );
    }

    return response.json();
  };

  const mutation = useMutation({
    mutationFn: decreaseQuantity,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["cart"], (oldData: any) => {
        const updatedItems = oldData.items.map((item: any) => {
          if (item.product_id === productId) {
            return { ...item, quantity: item.quantity - 1 };
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
      disabled={quantity <= 1}
      onClick={() => handleClick()}
      className="bg-[#8b878b33] p-2 h-[20px] flex justify-center items-center rounded-md"
    >
      -
    </button>
  );
}
