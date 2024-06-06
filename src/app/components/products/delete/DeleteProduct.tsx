"use client";

import { useQueryClient } from "@tanstack/react-query";

export default function DeleteProduct({ productId }: { productId: string }) {
  const queryClient = useQueryClient();
  const deleteProduct = async (productId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/product/delete?category&productId=${productId}`,
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
    <button className="bg-red-300" onClick={() => deleteProduct(productId)}>
      Delete
    </button>
  );
}
