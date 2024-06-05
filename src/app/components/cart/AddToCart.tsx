"use client";
import { useQueryClient } from "@tanstack/react-query";

export default function AddToCart({
  productId,
  userId,
  product_type,
}: {
  productId: number;
  userId: number;
  product_type: string;
}) {
  const queryClient = useQueryClient();
  const clickHandler = async () => {
    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, userId, product_type }),
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      const responseData = await response.json();
      queryClient.invalidateQueries({ queryKey: ["cart"] });

      console.log("Product added to cart successfully:", responseData);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
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
