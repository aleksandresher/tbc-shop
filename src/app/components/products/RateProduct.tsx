"use client";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Rating } from "react-simple-star-rating";

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

  const [rating, setRating] = useState(0);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<Product>();

  const handleRating = async (rate: number) => {
    setRating(rate);
    try {
      const response = await fetch(`/api/product/rate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          category,
          rating: rate,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to rate product");
      }

      const productData = await response.json();
      queryClient.invalidateQueries({ queryKey: ["rating"] });
      console.log("Product rated successfully:", productData);
    } catch (error) {
      console.error("Error rating product:", error);
    }
  };
  return (
    <section>
      <div className="App">
        <Rating onClick={handleRating} initialValue={3} className="hidden" />
      </div>
    </section>
  );
}
