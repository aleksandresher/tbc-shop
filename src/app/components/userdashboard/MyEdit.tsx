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
import Image from "next/image";
import ProductImageUpload from "../ImageUpload/ProductImageUploader";

import { useForm } from "react-hook-form";

interface FullLanguages {
  en: EnLanguageObject;
  ka: KaLanguageObject;
}

interface KaLanguageObject {
  title: string;
  category: string;
  country: string;
  brand: string;
  sdescription: string;
  ldescription: string;
  price: number;
  currency: string;
  image: string;
  numberofvotes: number;
  totalvotes: number;
  size: number;
}
interface EnLanguageObject {
  title: string;
  category: string;
  country: string;
  brand: string;
  sdescription: string;
  ldescription: string;
  price: number;
  currency: string;
  image: string;
  numberofvotes: number;
  totalvotes: number;
  size: number;
}

interface UserType {
  entitle?: string;
  enbrand?: string;
  encountry?: string;
  encategory?: string;
  ensdescription?: string;
  enldescription?: string;
  katitle?: string;
  kabrand?: string;
  kacountry?: string;
  kacategory?: string;
  kasdescription?: string;
  kaldescription?: string;
  size?: number;

  enprice?: number;
  kaprice?: number;
  image?: string;
}

const EditMyProduct = ({
  wholeItem,
  productId,
  size,
  image,
}: {
  wholeItem: FullLanguages;
  productId: number;
  size: number;
  image: string;
}) => {
  const { data: session } = useSession();

  console.log(session);
  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm<UserType>();

  const [open, setOpen] = useState(false);
  const [productImageUrl, setProductImageUrl] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const onSubmit = async (data: UserType) => {
    try {
      const response = await fetch(`/api/products/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data, productId: productId }),
      });

      if (!response.ok) {
        throw new Error("Failed to edit product");
      }

      const productData = await response.json();
      queryClient.invalidateQueries({ queryKey: ["myproducts"] });
      setOpen(false);
      console.log("product edited successfully:", productData);
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  const handleImageUpload = (url: string) => {
    setProductImageUrl(url);
    setValue("image", url);
  };

  const kaExists = wholeItem.ka.title !== "";
  const enExists = wholeItem.en.title !== "";
  console.log("kaExisted", kaExists);
  console.log("enexistd", enExists);
  return (
    <section className="flex items-center">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          asChild
          className=" flex justify-center  items-center  border-2 rounded-[8px] border-outset border-opacity-50 border-[#f1a45d] p-2 cursor-pointer w-[150px] h-[40px]"
        >
          <button className="w-[50px] bg-[#90e28d]">
            <Image
              src="/editbtn.svg"
              width={30}
              height={30}
              alt="edit button"
            />
          </button>
        </DialogTrigger>
        <div className="">
          <DialogContent className=" w-screen bg-gray-300">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex w-full">
                {kaExists && (
                  <section className="flex flex-col p-3 gap-4 w-1/2 ">
                    <div className="flex flex-col gap-1">
                      <div className="w-full flex items-center justify-between gap-2">
                        <label htmlFor="katitle">სათაური</label>
                        <input
                          className="p-2  rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                          id="katitle"
                          defaultValue={wholeItem.ka.title}
                          {...register("katitle", {
                            required: "სათაური სავალდებულოა",
                          })}
                        />
                      </div>
                      <span className="flex justify-end px-2">
                        {errors.katitle?.message && (
                          <p className="text-red-600">
                            {errors.katitle?.message}
                          </p>
                        )}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="w-full flex items-center justify-between gap-2">
                        <label htmlFor="brand">ბრენდი</label>
                        <input
                          className="p-2  rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                          id="kabrand"
                          defaultValue={wholeItem.ka.brand}
                          {...register("kabrand", {
                            required: "ბრენდი სავალდებულოა",
                          })}
                        />
                      </div>
                      <span className="flex justify-end">
                        {errors.kabrand?.message && (
                          <p className="text-red-600">
                            {errors.kabrand?.message}
                          </p>
                        )}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="w-full flex items-center justify-between gap-2">
                        <label htmlFor="kacategory">კატეგორია</label>
                        <select
                          defaultValue={wholeItem.ka.category}
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
                          defaultValue={wholeItem.ka.price}
                          type="number"
                          {...register("kaprice", {
                            required: "ფასი სავალდებულოა",
                          })}
                        />
                      </div>
                      <span className="flex justify-end">
                        {errors.kaprice?.message && (
                          <p className="text-red-600">
                            {errors.kaprice?.message}
                          </p>
                        )}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="w-full flex items-center justify-between gap-2">
                        <label htmlFor="kacountry">ქვეყანა</label>
                        <input
                          className="p-2  rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                          id="kacountry"
                          defaultValue={wholeItem.ka.price}
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
                          defaultValue={wholeItem.ka.sdescription}
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
                          defaultValue={wholeItem.ka.ldescription}
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
                          defaultValue={size}
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
                    <div className="flex flex-col gap-1">
                      <div className="w-full flex items-center justify-between gap-2">
                        <label htmlFor="image">ფოტო</label>
                        <input
                          className="p-2  rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                          id="image"
                          defaultValue={image}
                          {...register("image", {
                            required: "image is required",
                          })}
                        />
                      </div>
                      <span className="flex justify-end px-2">
                        {errors.image?.message && (
                          <p className="text-red-600">
                            {errors.image?.message}
                          </p>
                        )}
                      </span>
                    </div>
                    <ProductImageUpload onUploadComplete={handleImageUpload} />
                  </section>
                )}
                {enExists && (
                  <section className="flex flex-col p-3 gap-4 w-1/2">
                    <div className="flex flex-col gap-1">
                      <div className="w-full flex items-center justify-between gap-2">
                        <label htmlFor="entitle">Title</label>
                        <input
                          className="p-2  rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                          id="entitle"
                          defaultValue={wholeItem.en.title}
                          {...register("entitle", {
                            required: "Title is required",
                          })}
                        />
                      </div>
                      <span className="flex justify-end px-2">
                        {errors.entitle?.message && (
                          <p className="text-red-600">
                            {errors.entitle?.message}
                          </p>
                        )}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="w-full flex items-center justify-between gap-2">
                        <label htmlFor="enbrand">Brand</label>
                        <input
                          className="p-2  rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                          id="enbrand"
                          defaultValue={wholeItem.en.brand}
                          {...register("enbrand", {
                            required: "brand is required",
                          })}
                        />
                      </div>
                      <span className="flex justify-end">
                        {errors.enbrand?.message && (
                          <p className="text-red-600">
                            {errors.enbrand?.message}
                          </p>
                        )}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="w-full flex items-center justify-between gap-2">
                        <label htmlFor="encategory">category</label>
                        <select
                          defaultValue={wholeItem.en.category}
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
                          defaultValue={wholeItem.en.price}
                          type="number"
                          {...register("enprice", {
                            required: "price is required",
                          })}
                        />
                      </div>
                      <span className="flex justify-end">
                        {errors.enprice?.message && (
                          <p className="text-red-600">
                            {errors.enprice?.message}
                          </p>
                        )}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="w-full flex items-center justify-between gap-2">
                        <label htmlFor="encountry">country</label>
                        <input
                          className="p-2  rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                          defaultValue={wholeItem.en.country}
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
                        <label htmlFor="ensdescription">
                          small description
                        </label>
                        <input
                          className="p-2  rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                          defaultValue={wholeItem.en.sdescription}
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
                        <label htmlFor="enldescription">
                          large description
                        </label>
                        <input
                          className="p-2  rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                          defaultValue={wholeItem.en.ldescription}
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
                          defaultValue={size}
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
                          defaultValue={wholeItem.en.image}
                          {...register("image", {
                            required: "image is required",
                          })}
                        />
                      </div>
                      <span className="flex justify-end px-2">
                        {errors.image?.message && (
                          <p className="text-red-600">
                            {errors.image?.message}
                          </p>
                        )}
                      </span>
                    </div>
                  </section>
                )}
              </div>

              <button
                type="submit"
                className="bg-green-400 rounded-full p-2 uppercase"
              >
                Edit
              </button>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </section>
  );
};

export default EditMyProduct;
