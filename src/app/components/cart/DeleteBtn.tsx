"use client";
import { useQueryClient } from "@tanstack/react-query";
import DeleteIcon from "../svg/DeleteIcon";

export default function DeleteButton({ product_id }: { product_id: number }) {
  let userId = "";
  if (typeof window !== "undefined") {
    userId = localStorage.getItem("userId") || "";
  }

  const queryClient = useQueryClient();
  const handleClick = async (productId: number) => {
    try {
      const response = await fetch("/api/cart/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, userId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      return data;
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  return (
    <button
      onClick={() => handleClick(product_id)}
      className="flex justify-center"
    >
      <DeleteIcon />
    </button>
  );
}
