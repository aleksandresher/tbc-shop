"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { useForm } from "react-hook-form";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
}

interface ProductTableProps {
  product: Product;
  productId: string;
}

const EditBodyProduct = ({ product, productId }: ProductTableProps) => {
  const { data: session } = useSession();

  console.log(session);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<Product>();

  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const onSubmit = async (data: Product) => {
    try {
      const response = await fetch(`/api/product/edit/body`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data, id: productId }),
      });

      if (!response.ok) {
        throw new Error("Failed to edit product");
      }

      const productData = await response.json();
      queryClient.invalidateQueries({ queryKey: ["body"] });
      setOpen(false);
      console.log("product edited successfully:", productData);
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  return (
    <section className="flex items-center">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          asChild
          className=" flex justify-center  items-center  border-2 rounded-[8px] border-outset border-opacity-50 border-[#f1a45d] p-2 cursor-pointer w-[150px] h-[40px]"
        >
          <button className="w-[50px] bg-[#90e28d]">Edit</button>
        </DialogTrigger>
        <div className="">
          <DialogContent className="w-[450px] opacity-100 bg-[#c7f9cc] left-[35%] top-[35%] absolute">
            <form onSubmit={handleSubmit(onSubmit)}>
              <section className="flex flex-col w-[400px] p-3 gap-4">
                <div className="flex flex-col gap-1">
                  <div className="w-full flex items-center justify-between gap-2">
                    <label htmlFor="title">Title</label>
                    <input
                      defaultValue={product.title}
                      placeholder={product.title}
                      className="p-2  rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                      id="title"
                      {...register("title", {
                        required: "title is required",
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
                    <label htmlFor="description">description</label>
                    <input
                      defaultValue={product.description}
                      placeholder={product.description}
                      className="p-2  rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                      id="description"
                      {...register("description", {
                        required: "description is required",
                      })}
                    />
                  </div>
                  <span className="flex justify-end">
                    {errors.description?.message && (
                      <p className="text-red-600">
                        {errors.description?.message}
                      </p>
                    )}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="w-full flex items-center justify-between gap-2">
                    <label htmlFor="price">price</label>
                    <input
                      defaultValue={product.price}
                      // placeholder={product.price.toString()}
                      className="p-2  rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                      id="price"
                      type="number"
                      {...register("price", {
                        required: "price is required",
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
              <DialogFooter>
                <button
                  type="submit"
                  className="bg-green-400 rounded-full p-2 uppercase"
                >
                  Save
                </button>
              </DialogFooter>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </section>
  );
};

export default EditBodyProduct;
