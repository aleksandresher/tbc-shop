"use client";

import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

export default function DeleteProduct({ productId }: { productId: number }) {
  const queryClient = useQueryClient();
  const deleteProduct = async (productId: number) => {
    try {
      const response = await fetch(
        `/api/products/delete?productId=${productId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      queryClient.invalidateQueries({ queryKey: ["myproducts"] });

      return response.json();
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  };
  return (
    <button className="bg-red-300" onClick={() => deleteProduct(productId)}>
      <Image
        src="/delete.svg"
        width={30}
        height={30}
        alt="delete button"
        className=""
      />
    </button>
  );
}
