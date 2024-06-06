"use client";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

interface Product {
  rating: number;
}

export default function RateProduct({
  productId,
  category,
}: {
  productId: number;
  category: string;
}) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<Product>();

  const onSubmit = async (data: Product) => {
    try {
      const response = await fetch(`/api/product/rate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: productId,
          category,
          rating: data.rating,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to rate product");
      }

      const productData = await response.json();
      queryClient.invalidateQueries({ queryKey: ["rating"] });
      setOpen(false);
      console.log("product rated successfully:", productData);
    } catch (error) {
      console.error("Error rating product:", error);
    }
  };
  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex items-center justify-between gap-2">
          <label htmlFor="rating">rating</label>
          <input
            className="p-2  rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
            type="number"
            id="rating"
            {...register("rating", {
              required: "rating is required",
            })}
          />
        </div>
        <button type="submit">rate</button>
      </form>
    </section>
  );
}
