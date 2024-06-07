"use client";

import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import ImageUploadPage from "../../ImageUpload/ImageUploader";
import { useState } from "react";

interface UserType {
  title: string;
  description: string;
  price: number;
  category: string;
}

const BodyProductCreator = () => {
  const queryClient = useQueryClient();
  const { data, status } = useSession();
  const userEmail = data?.user?.email;
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserType>();

  const onSubmit = async (data: UserType) => {
    try {
      const response = await fetch("/api/product/create/body", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, userEmail, imageUrl }),
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      const userData = await response.json();

      queryClient.invalidateQueries({ queryKey: ["products"] });
      console.log("created");

      // setOpen(false);
      console.log("Product created successfully:", userData);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <section className="p-16">
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="flex flex-col p-3 gap-4 ">
          <div className="flex flex-col gap-1">
            <div className="w-full flex items-center justify-between gap-2">
              <label htmlFor="title">Title</label>
              <input
                className="p-2  rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                id="title"
                {...register("title", {
                  required: "Title is required",
                })}
              />
            </div>
            <span className="flex justify-end px-2">
              {errors.title?.message && (
                <p className="text-red-600">{errors.title?.message}</p>
              )}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="w-full flex items-center justify-between gap-2">
              <label htmlFor="description">Description</label>
              <input
                className="p-2  rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                id="description"
                {...register("description", {
                  required: "description is required",
                })}
              />
            </div>
            <span className="flex justify-end">
              {errors.description?.message && (
                <p className="text-red-600">{errors.description?.message}</p>
              )}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <div className="w-full flex items-center justify-between gap-2">
              <label htmlFor="category">category</label>
              <input
                className="p-2  rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                id="category"
                value="body"
                {...register("category", {
                  required: "category is required",
                })}
              />
            </div>
            <span className="flex justify-end px-2">
              {errors.category?.message && (
                <p className="text-red-600">{errors.category?.message}</p>
              )}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <div className="w-full flex items-center justify-between gap-2">
              <label htmlFor="price">price</label>
              <input
                className="p-2  rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                id="price"
                type="number"
                {...register("price", {
                  required: "Age is required",
                })}
              />
            </div>
            <span className="flex justify-end">
              {errors.price?.message && (
                <p className="text-red-600">{errors.price?.message}</p>
              )}
            </span>
          </div>
        </section>

        <button
          type="submit"
          className="bg-green-400 rounded-full p-2 uppercase"
        >
          Create
        </button>
      </form>
      <ImageUploadPage onUploadComplete={(url) => setImageUrl(url)} />
    </section>
  );
};

export default BodyProductCreator;
