"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import ProductImageUpload from "../ImageUpload/ProductImageUploader";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
const URL = process.env.NEXT_PUBLIC_BASE_URL;
interface BlogType {
  title: string;
  image: string;
  content: string;
  author: string;
}

export default function BlogCreator() {
  const queryClient = useQueryClient();
  const [blogImageUrl, setBlogImageUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    resetField,
    formState: { errors },
  } = useForm<BlogType>();

  const onSubmit = async (data: BlogType) => {
    try {
      const response = await fetch(`${URL}/api/blog/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data, image: blogImageUrl }),
      });

      if (!response.ok) {
        throw new Error("Failed to create blog");
      }

      const blogData = await response.json();

      queryClient.invalidateQueries({ queryKey: ["blogs"] });

      console.log("Blog created successfully:", blogData);
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  const handleImageUpload = (url: string) => {
    setBlogImageUrl(url);
    setValue("image", url);
  };
  return (
    <div className="w-full">
      <Dialog>
        <DialogTrigger
          asChild
          className="border-2 rounded-[8px] border-outset border-opacity-50 border-[#f1a45d] p-2 cursor-pointer"
        >
          <p>Add Blog</p>
        </DialogTrigger>
        <DialogContent className="w-[1300px] bg-gray-300">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex w-full">
              <section className="flex flex-col p-3 gap-4 w-1/2 ">
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
                    <label htmlFor="content">Content</label>
                    <input
                      className="p-2  rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                      id="content"
                      {...register("content", {
                        required: "content is required",
                      })}
                    />
                  </div>
                  <span className="flex justify-end px-2">
                    {errors.content?.message && (
                      <p className="text-red-600">{errors.content?.message}</p>
                    )}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="w-full flex items-center justify-between gap-2">
                    <label htmlFor="author">Author name</label>
                    <input
                      className="p-2  rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                      id="author"
                      {...register("author", {
                        required: "author is required",
                      })}
                    />
                  </div>
                  <span className="flex justify-end px-2">
                    {errors.author?.message && (
                      <p className="text-red-600">{errors.author?.message}</p>
                    )}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="w-full flex items-center justify-between gap-2">
                    <label htmlFor="image">Image</label>
                    <input
                      className="p-2  rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                      id="image"
                      value={blogImageUrl || ""}
                      {...register("image", {
                        required: "image is required",
                      })}
                    />
                  </div>
                  <span className="flex justify-end px-2">
                    {errors.image?.message && (
                      <p className="text-red-600">{errors.image?.message}</p>
                    )}
                  </span>
                </div>
                <ProductImageUpload onUploadComplete={handleImageUpload} />
              </section>
            </div>

            <span className="flex gap-4">
              <button
                type="submit"
                className="bg-green-400 rounded-full p-2 uppercase"
              >
                Create
              </button>
            </span>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
