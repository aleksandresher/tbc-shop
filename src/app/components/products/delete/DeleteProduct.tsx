"use client";

import { useQueryClient } from "@tanstack/react-query";

export default function DeleteProduct({
  userId,
  productId,
}: {
  userId: string;
  productId: string;
}) {
  const queryClient = useQueryClient();
  const deleteProduct = async (userId: string, productId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/product/delete?userId=${userId}&productId=${productId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      queryClient.invalidateQueries({ queryKey: ["products"] });

      return response.json();
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  };
  return (
    <button
      className="bg-red-300"
      onClick={() => deleteProduct(userId, productId)}
    >
      Delete
    </button>
  );
}
