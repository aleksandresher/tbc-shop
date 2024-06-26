"use client";

import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface UserType {
  entitle: string;
  enbrand: string;
  encountry: string;
  encategory: string;
  ensdescription: string;
  enldescription: string;
  katitle: string;
  kabrand: string;
  kacountry: string;
  kacategory: string;
  kasdescription: string;
  kaldescription: string;
  size: number;
  enprice: number;
  kaprice: number;
  image: string;
}

export default function ProductCreator() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserType>();

  const onSubmit = async (data: UserType) => {
    try {
      const response = await fetch("/api/product/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      const userData = await response.json();
      console.log(userData);

      queryClient.invalidateQueries({ queryKey: ["products"] });
      console.log("created");

      console.log("Product created successfully:", userData);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };
  return (
    <div className="w-full">
      <Dialog>
        <DialogTrigger
          asChild
          className="border-2 rounded-[8px] border-outset border-opacity-50 border-[#f1a45d] p-2 cursor-pointer"
        >
          <p>Add Product</p>
        </DialogTrigger>
        <DialogContent className="w-[1300px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex w-full">
              <section className="flex flex-col p-3 gap-4 w-1/2">
                <div className="flex flex-col gap-1">
                  <div className="w-full flex items-center justify-between gap-2">
                    <label htmlFor="entitle">Title</label>
                    <input
                      className="p-2  rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                      id="entitle"
                      {...register("entitle", {
                        required: "Title is required",
                      })}
                    />
                  </div>
                  <span className="flex justify-end px-2">
                    {errors.entitle?.message && (
                      <p className="text-red-600">{errors.entitle?.message}</p>
                    )}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="w-full flex items-center justify-between gap-2">
                    <label htmlFor="enbrand">Brand</label>
                    <input
                      className="p-2  rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                      id="enbrand"
                      {...register("enbrand", {
                        required: "brand is required",
                      })}
                    />
                  </div>
                  <span className="flex justify-end">
                    {errors.enbrand?.message && (
                      <p className="text-red-600">{errors.enbrand?.message}</p>
                    )}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="w-full flex items-center justify-between gap-2">
                    <label htmlFor="encategory">category</label>
                    <select
                      {...register("encategory", {
                        required: "category is required",
                      })}
                    >
                      <option value="skin">skin</option>
                      <option value="body">body</option>
                      <option value="hair">hair</option>
                    </select>
                  </div>
                  <span className="flex justify-end px-2">
                    {errors.encategory?.message && (
                      <p className="text-red-600">
                        {errors.encategory?.message}
                      </p>
                    )}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="w-full flex items-center justify-between gap-2">
                    <label htmlFor="enprice">price</label>
                    <input
                      className="p-2  rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                      id="enprice"
                      type="number"
                      {...register("enprice", {
                        required: "price is required",
                      })}
                    />
                  </div>
                  <span className="flex justify-end">
                    {errors.enprice?.message && (
                      <p className="text-red-600">{errors.enprice?.message}</p>
                    )}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="w-full flex items-center justify-between gap-2">
                    <label htmlFor="encountry">country</label>
                    <input
                      className="p-2  rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                      id="encountry"
                      {...register("encountry", {
                        required: "country is required",
                      })}
                    />
                  </div>
                  <span className="flex justify-end px-2">
                    {errors.encategory?.message && (
                      <p className="text-red-600">
                        {errors.encategory?.message}
                      </p>
                    )}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="w-full flex items-center justify-between gap-2">
                    <label htmlFor="ensdescription">small description</label>
                    <input
                      className="p-2  rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                      id="ensdescription"
                      {...register("ensdescription", {
                        required: "small description is required",
                      })}
                    />
                  </div>
                  <span className="flex justify-end px-2">
                    {errors.ensdescription?.message && (
                      <p className="text-red-600">
                        {errors.ensdescription?.message}
                      </p>
                    )}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="w-full flex items-center justify-between gap-2">
                    <label htmlFor="enldescription">large description</label>
                    <input
                      className="p-2  rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                      id="enldescription"
                      {...register("enldescription", {
                        required: "ldescription is required",
                      })}
                    />
                  </div>
                  <span className="flex justify-end px-2">
                    {errors.enldescription?.message && (
                      <p className="text-red-600">
                        {errors.enldescription?.message}
                      </p>
                    )}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="w-full flex items-center justify-between gap-2">
                    <label htmlFor="size">size</label>
                    <input
                      className="p-2  rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                      id="size"
                      type="number"
                      {...register("size", {
                        required: "size is required",
                      })}
                    />
                  </div>
                  <span className="flex justify-end">
                    {errors.size?.message && (
                      <p className="text-red-600">{errors.size?.message}</p>
                    )}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="w-full flex items-center justify-between gap-2">
                    <label htmlFor="image">Image</label>
                    <input
                      className="p-2  rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                      id="image"
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
              </section>

              <section className="flex flex-col p-3 gap-4 w-1/2 ">
                <div className="flex flex-col gap-1">
                  <div className="w-full flex items-center justify-between gap-2">
                    <label htmlFor="katitle">სათაური</label>
                    <input
                      className="p-2  rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                      id="katitle"
                      {...register("katitle", {
                        required: "სათაური სავალდებულოა",
                      })}
                    />
                  </div>
                  <span className="flex justify-end px-2">
                    {errors.katitle?.message && (
                      <p className="text-red-600">{errors.katitle?.message}</p>
                    )}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="w-full flex items-center justify-between gap-2">
                    <label htmlFor="brand">ბრენდი</label>
                    <input
                      className="p-2  rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                      id="kabrand"
                      {...register("kabrand", {
                        required: "ბრენდი სავალდებულოა",
                      })}
                    />
                  </div>
                  <span className="flex justify-end">
                    {errors.kabrand?.message && (
                      <p className="text-red-600">{errors.kabrand?.message}</p>
                    )}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="w-full flex items-center justify-between gap-2">
                    <label htmlFor="kacategory">კატეგორია</label>
                    <select
                      {...register("kacategory", {
                        required: "კატეგორია სავალდებულოა",
                      })}
                    >
                      <option value="კანი">კანი</option>
                      <option value="ტანი">ტანი</option>
                      <option value="თმა">თმა</option>
                    </select>
                  </div>
                  <span className="flex justify-end px-2">
                    {errors.kacategory?.message && (
                      <p className="text-red-600">
                        {errors.kacategory?.message}
                      </p>
                    )}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="w-full flex items-center justify-between gap-2">
                    <label htmlFor="kaprice">ფასი</label>
                    <input
                      className="p-2  rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                      id="kaprice"
                      type="number"
                      {...register("kaprice", {
                        required: "ფასი სავალდებულოა",
                      })}
                    />
                  </div>
                  <span className="flex justify-end">
                    {errors.kaprice?.message && (
                      <p className="text-red-600">{errors.kaprice?.message}</p>
                    )}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="w-full flex items-center justify-between gap-2">
                    <label htmlFor="kacountry">ქვეყანა</label>
                    <input
                      className="p-2  rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                      id="kacountry"
                      {...register("kacountry", {
                        required: "ქვეყანა სავალდებულოა",
                      })}
                    />
                  </div>
                  <span className="flex justify-end px-2">
                    {errors.kacategory?.message && (
                      <p className="text-red-600">
                        {errors.kacategory?.message}
                      </p>
                    )}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="w-full flex items-center justify-between gap-2">
                    <label htmlFor="kasdescription">აღწერა</label>
                    <input
                      className="p-2  rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                      id="kasdescription"
                      {...register("kasdescription", {
                        required: "აღწერა სავალდებულოა",
                      })}
                    />
                  </div>
                  <span className="flex justify-end px-2">
                    {errors.kasdescription?.message && (
                      <p className="text-red-600">
                        {errors.kasdescription?.message}
                      </p>
                    )}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="w-full flex items-center justify-between gap-2">
                    <label htmlFor="kaldescription">მოკლე აღწერა</label>
                    <input
                      className="p-2  rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                      id="kaldescription"
                      {...register("kaldescription", {
                        required: "მოკლე აღწერა სავალდებულოა",
                      })}
                    />
                  </div>
                  <span className="flex justify-end px-2">
                    {errors.kaldescription?.message && (
                      <p className="text-red-600">
                        {errors.kaldescription?.message}
                      </p>
                    )}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="w-full flex items-center justify-between gap-2">
                    <label htmlFor="size">ზომა</label>
                    <input
                      className="p-2  rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                      id="size"
                      type="number"
                      {...register("size", {
                        required: "ზომა სავალდებულოა",
                      })}
                    />
                  </div>
                  <span className="flex justify-end">
                    {errors.size?.message && (
                      <p className="text-red-600">{errors.size?.message}</p>
                    )}
                  </span>
                </div>
              </section>
            </div>

            <button
              type="submit"
              className="bg-green-400 rounded-full p-2 uppercase"
            >
              Create
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
