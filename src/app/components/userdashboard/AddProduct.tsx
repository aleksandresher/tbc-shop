"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import ProductImageUpload from "../ImageUpload/ProductImageUploader";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useI18n } from "@/app/locales/client";
import { toast } from "@/components/ui/use-toast";

const URL = process.env.NEXT_PUBLIC_BASE_URL;

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
  ensize: number;
  kasize: number;
  enprice: number;
  kaprice: number;
  image: string;
}

export default function AddMyProduct() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [productImageUrl, setProductImageUrl] = useState<string | null>(null);
  const [isEn, setIsEn] = useState(false);
  const t = useI18n();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserType>();

  const onSubmit = async (data: UserType) => {
    try {
      if (isEn) {
        if (
          !data.entitle ||
          !data.enbrand ||
          !data.encountry ||
          !data.encategory ||
          !data.ensdescription ||
          !data.enldescription ||
          !data.ensize ||
          !data.enprice ||
          !data.image
        ) {
          throw new Error("All English description fields are required");
        }
      }
      const response = await fetch(`${URL}/api/products/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      const productData = await response.json();

      queryClient.invalidateQueries({ queryKey: ["myproducts"] });
      setOpen(false);
      toast({ description: "Product created successfully" });

      console.log("Product created successfully:", productData);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleImageUpload = (url: string) => {
    setProductImageUrl(url);
    setValue("image", url);
  };

  return (
    <div className="w-full pt-4 pl-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          asChild
          className="border-2 rounded-[8px] flex justify-center w-[120px] md:w-[200px] border-outset border-opacity-50 border-[#f1a45d] p-2 cursor-pointer"
        >
          <p className="dark:text-black">{t("addProduct")}</p>
        </DialogTrigger>
        <DialogContent className="max-h-screen h-screen overflow-y-auto bg-gray-300 overflow-x-hidden">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col md:flex-row w-full">
              <section className="flex flex-col p-3 gap-4 sm:w-1/2 ">
                <div className="w-[320px] md:w-4/5 flex flex-col gap-1">
                  <div className=" flex items-center justify-between md:justify-center gap-2">
                    <label htmlFor="katitle">სათაური</label>
                    <input
                      className="p-2  rounded-[8px] w-full border border-[#4fec5c] outline-none focus:border-[#48a850]"
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

                <div className="w-[320px] md:w-4/5 flex flex-col gap-1">
                  <div className="w-full flex items-center justify-between md:justify-center  gap-2">
                    <label htmlFor="brand">ბრენდი</label>
                    <input
                      className="p-2  rounded-[4px] w-full border border-[#0c0c0c] outline-none focus:border-[#48a850]"
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
                  <div className="w-full flex items-center justify-start gap-14">
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

                <div className="w-[320px] sm:w-3/5 flex flex-col md:flex-row gap-1">
                  <div className="w-full flex items-center justify-between md:justify-center gap-2">
                    <label htmlFor="kaprice">ფასი</label>
                    <input
                      className="p-2  rounded-[8px] w-full border border-[#4fec5c] outline-none focus:border-[#48a850]"
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
                <div className=" w-[320px] sm:w-4/5 flex flex-col gap-1">
                  <div className="w-full flex items-center justify-between md:justify-center gap-2">
                    <label htmlFor="kacountry">ქვეყანა</label>
                    <input
                      className="p-2  w-full rounded-[8px]  border border-[#4fec5c] outline-none focus:border-[#48a850]"
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
                <div className=" w-[320px] sm:w-4/5 flex flex-col gap-1">
                  <div className="w-full flex items-center justify-between  gap-2">
                    <label htmlFor="kasdescription">აღწერა</label>
                    <textarea
                      className="p-2  rounded-[8px] w-full border border-[#4fec5c] outline-none focus:border-[#48a850]"
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
                <div className=" w-[320px] sm:w-4/5 flex flex-col gap-1">
                  <div className="w-full flex items-center justify-between  gap-2">
                    <label htmlFor="kaldescription">მოკლე აღწერა</label>
                    <textarea
                      className="p-2  rounded-[8px] w-full border border-[#4fec5c] outline-none focus:border-[#48a850]"
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
                <div className=" w-[320px] sm:w-4/5 flex flex-col md:flex-row gap-1">
                  <div className="w-full flex items-center justify-between md:justify-center gap-2">
                    <label htmlFor="size">ზომა</label>
                    <input
                      className="p-2  rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                      id="size"
                      type="number"
                      {...register("kasize", {
                        required: "ზომა სავალდებულოა",
                      })}
                    />
                  </div>
                  <span className="flex justify-end">
                    {errors.kasize?.message && (
                      <p className="text-red-600">{errors.kasize?.message}</p>
                    )}
                  </span>
                </div>
                <div className=" w-[320px] sm:w-4/5 flex flex-col gap-1 mb-5">
                  <div className="w-full flex items-center justify-between md:justify-center gap-2">
                    <label htmlFor="image">ფოტო</label>
                    <input
                      className="p-2  rounded-[8px] w-full border border-[#4fec5c] outline-none focus:border-[#48a850]"
                      id="image"
                      value={productImageUrl || ""}
                      {...register("image", {
                        onChange(event) {
                          setProductImageUrl(event.target.value);
                        },
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

              {isEn && (
                <section className="flex flex-col p-3 gap-4 sm:w-1/2">
                  <div className="w-[320px] sm:w-full flex flex-col gap-1">
                    <div className="w-full flex items-center justify-between  gap-2">
                      <label htmlFor="entitle">Title</label>
                      <input
                        className="p-2  rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                        id="entitle"
                        {...register("entitle")}
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

                  <div className=" w-[320px] sm:w-full flex flex-col gap-1">
                    <div className="w-full flex items-center justify-between  gap-2">
                      <label htmlFor="enbrand">Brand</label>
                      <input
                        className="p-2  rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                        id="enbrand"
                        {...register("enbrand")}
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
                    <div className="w-full flex items-center justify-start gap-14">
                      <label htmlFor="encategory">category</label>
                      <select {...register("encategory")}>
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

                  <div className=" w-[320px] sm:w-full flex flex-col gap-1">
                    <div className="w-full flex items-center justify-between  gap-2">
                      <label htmlFor="enprice">price</label>
                      <input
                        className="p-2  rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                        id="enprice"
                        type="number"
                        {...register("enprice")}
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
                  <div className=" w-[320px] sm:w-full flex flex-col gap-1">
                    <div className="w-full flex items-center justify-between  gap-2">
                      <label htmlFor="encountry">country</label>
                      <input
                        className="p-2  rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                        id="encountry"
                        {...register("encountry")}
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
                  <div className=" w-[320px] sm:w-full flex flex-col gap-1">
                    <div className="w-full flex items-center justify-between  gap-2">
                      <label htmlFor="ensdescription">small description</label>
                      <textarea
                        className="p-2  rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                        id="ensdescription"
                        {...register("ensdescription")}
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
                  <div className=" w-[320px] sm:w-full flex flex-col gap-1">
                    <div className="w-full flex items-center justify-between  gap-2">
                      <label htmlFor="enldescription">large description</label>
                      <textarea
                        className="p-2  rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                        id="enldescription"
                        {...register("enldescription")}
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
                  <div className=" w-[320px] sm:w-full flex flex-col gap-1">
                    <div className="w-full flex items-center justify-between  gap-2">
                      <label htmlFor="size">size</label>
                      <input
                        className="p-2  rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                        id="ensize"
                        type="number"
                        {...register("ensize")}
                      />
                    </div>
                    <span className="flex justify-end">
                      {errors.ensize?.message && (
                        <p className="text-red-600">{errors.ensize?.message}</p>
                      )}
                    </span>
                  </div>
                </section>
              )}
            </div>
            <span className="flex gap-4  w-1/2 justify-evenly mt-8">
              <button
                type="submit"
                className="bg-green-400 rounded-full p-2 uppercase"
              >
                {t("createProduct")}
              </button>
              {!isEn ? (
                <button onClick={() => setIsEn((prev) => !prev)} type="button">
                  დაამატე პროდუქტი ინგლისურ ენაზე
                </button>
              ) : (
                <button onClick={() => setIsEn((prev) => !prev)} type="button">
                  არ მსურს დამატება
                </button>
              )}
            </span>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
