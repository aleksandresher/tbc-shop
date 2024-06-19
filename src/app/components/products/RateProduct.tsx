"use client";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Rating } from "react-simple-star-rating";
const URL = process.env.NEXT_PUBLIC_BASE_URL;

interface Product {
  rating: number;
}

export default function RateProduct({
  amount,
  total,
  productId,
}: {
  productId: number;
  amount: number;
  total: number;
}) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const [rating, setRating] = useState(0);
  const avarageRating = total / amount;

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<Product>();

  const handleRating = async (rate: number) => {
    setRating(rate);
    try {
      const response = await fetch(`${URL}/api/product/rate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
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
    <section className="flex items-center justify-center gap-1">
      <div className="App">
        <Rating
          onClick={handleRating}
          initialValue={avarageRating}
          className="hidden"
          size={20}
        />
      </div>
      <span className="flex gap-1 items-center">
        <p className="text-sm">{total}</p>
        <p className="text-sm">({amount})</p>
      </span>
    </section>
  );
}
