"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import ProductImageUpload from "../ImageUpload/ProductImageUploader";

import { useState } from "react";
import { useI18n } from "@/app/locales/client";
import { toast } from "@/components/ui/use-toast";
import FadeLoader from "react-spinners/FadeLoader";

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
  const [isLoading, setIsLoading] = useState(false);
  const t = useI18n();

  const {
    register,
    handleSubmit,
    setValue,
    resetField,
    reset,
    formState: { errors },
  } = useForm<UserType>();

  const onSubmit = async (data: UserType) => {
    setIsLoading(true);
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
      setIsLoading(false);

      const productData = await response.json();

      queryClient.invalidateQueries({ queryKey: ["myproducts"] });
      setOpen(false);
      toast({ description: "Product created successfully" });
      reset();
      resetField("image");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleImageUpload = (url: string) => {
    setProductImageUrl(url);
    setValue("image", url);
  };

  return (
    <div className="w-full lg:pt-4 lg:pl-4 relative  flex flex-col lg:flex-row ">
      {/* <div className="absolute translate-x-2/4 z-50">
        {isLoading && <FadeLoader />}
      </div> */}

      <form onSubmit={handleSubmit(onSubmit)} className=" w-full lg:w-4/5 ">
        <div className="flex flex-col items-center  w-full">
          <section className="flex flex-col items-center lg:p-3 gap-4 sm:w-full border-b-2 border-black pb-7 relative  ">
            <div className="w-[320px] px-4 md:w-4/5 flex flex-col gap-1 ">
              <div className=" flex flex-col  justify-between md:justify-center gap-2">
                <label htmlFor="katitle">სათაური</label>
                <input
                  className="p-2  rounded-[8px] w-4/5 lg:w-full border border-[#4fec5c] outline-none focus:border-[#48a850]"
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
              <div className=" px-4 flex flex-col  justify-between md:justify-center gap-2">
                <label htmlFor="brand">ბრენდი</label>
                <input
                  className="p-2 w-4/5  rounded-[4px] lg:w-full border border-[#4fec5c] outline-none focus:border-[#48a850]"
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

            <div className="w-[320px] md:w-4/5 flex flex-col gap-1">
              <div className="px-4 w-full flex  justify-start gap-14">
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
                  <p className="text-red-600">{errors.kacategory?.message}</p>
                )}
              </span>
            </div>

            <div className="w-[320px] md:w-4/5 flex flex-col  gap-1">
              <div className="px-4 w-full flex flex-col  gap-2">
                <label htmlFor="kaprice">ფასი</label>
                <input
                  className="p-2  rounded-[8px] w-1/2 lg:w-1/6 border border-[#4fec5c] outline-none focus:border-[#48a850]"
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
              <div className="px-4 flex flex-col  justify-between md:justify-center gap-2">
                <label htmlFor="kacountry">ქვეყანა</label>
                <input
                  className="p-2  w-1/2  lg:w-2/6 rounded-[8px]  border border-[#4fec5c] outline-none focus:border-[#48a850]"
                  id="kacountry"
                  {...register("kacountry", {
                    required: "ქვეყანა სავალდებულოა",
                  })}
                />
              </div>
              <span className="flex justify-end px-2">
                {errors.kacategory?.message && (
                  <p className="text-red-600">{errors.kacategory?.message}</p>
                )}
              </span>
            </div>
            <div className=" w-[320px] sm:w-4/5 flex flex-col gap-1">
              <div className="px-4 flex flex-col  justify-between md:justify-center gap-2">
                <label htmlFor="kasdescription">აღწერა</label>
                <textarea
                  className="p-2  rounded-[8px] min-h-[120px] w-[90%] lg:w-full border border-[#4fec5c] outline-none focus:border-[#48a850]"
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
              <div className=" px-4 flex flex-col  justify-between md:justify-center gap-22">
                <label htmlFor="kaldescription">მოკლე აღწერა</label>
                <textarea
                  className="p-2 min-h-[120px]  rounded-[8px] w-[90%] lg:w-full border border-[#4fec5c] outline-none focus:border-[#48a850]"
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
              <div className="flex flex-col px-4  justify-between md:justify-center gap-2">
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
              <div className="flex flex-col px-4  justify-between md:justify-center gap-2">
                <label htmlFor="image">ფოტო</label>
                <input
                  className="p-2  rounded-[8px] w-4/5 lg:w-full border border-[#4fec5c] outline-none focus:border-[#48a850]"
                  id="image"
                  value={productImageUrl || ""}
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

          {isEn && (
            <section className="flex flex-col items-center p-3 gap-4 sm:w-full ">
              <div className="w-[320px] md:w-4/5 flex flex-col gap-1">
                <div className="px-4 flex flex-col  justify-between md:justify-center gap-2">
                  <label htmlFor="entitle">Title</label>
                  <input
                    className="p-2  rounded-[8px] w-4/5 lg:w-full border border-[#4fec5c] outline-none focus:border-[#48a850]"
                    id="entitle"
                    {...register("entitle")}
                  />
                </div>
                <span className="flex justify-end px-2">
                  {errors.entitle?.message && (
                    <p className="text-red-600">{errors.entitle?.message}</p>
                  )}
                </span>
              </div>

              <div className=" w-[320px] sm:w-4/5 flex flex-col  gap-1 ">
                <div className="px-4 flex flex-col w-full  justify-between md:justify-center gap-2">
                  <label htmlFor="enbrand">Brand</label>
                  <input
                    className="p-2  rounded-[8px] w-4/5 lg:w-full border border-[#4fec5c] outline-none focus:border-[#48a850]"
                    id="enbrand"
                    {...register("enbrand")}
                  />
                </div>
                <span className="flex justify-end">
                  {errors.enbrand?.message && (
                    <p className="text-red-600">{errors.enbrand?.message}</p>
                  )}
                </span>
              </div>

              <div className="w-[320px] md:w-4/5 flex flex-col gap-1">
                <div className="px-4 w-full flex  justify-start gap-14">
                  <label htmlFor="encategory">category</label>
                  <select {...register("encategory")}>
                    <option value="skin">skin</option>
                    <option value="body">body</option>
                    <option value="hair">hair</option>
                  </select>
                </div>
                <span className="flex justify-end px-2">
                  {errors.encategory?.message && (
                    <p className="text-red-600">{errors.encategory?.message}</p>
                  )}
                </span>
              </div>

              <div className="w-[320px] md:w-4/5 flex flex-col  gap-1">
                <div className="px-4 w-full flex flex-col  gap-2">
                  <label htmlFor="enprice">price</label>
                  <input
                    className="p-2  rounded-[8px] w-1/2 lg:w-1/6 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                    id="enprice"
                    type="number"
                    {...register("enprice")}
                  />
                </div>
                <span className="flex justify-end">
                  {errors.enprice?.message && (
                    <p className="text-red-600">{errors.enprice?.message}</p>
                  )}
                </span>
              </div>
              <div className=" w-[320px] sm:w-4/5 flex flex-col gap-1">
                <div className="px-4 flex flex-col  justify-between md:justify-center gap-2">
                  <label htmlFor="encountry">country</label>
                  <input
                    className="p-2  rounded-[8px] w-1/2 lg:w-2/6 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                    id="encountry"
                    {...register("encountry")}
                  />
                </div>
                <span className="flex justify-end px-2">
                  {errors.encategory?.message && (
                    <p className="text-red-600">{errors.encategory?.message}</p>
                  )}
                </span>
              </div>
              <div className=" w-[320px] sm:w-4/5 flex flex-col gap-1">
                <div className=" px-4 flex flex-col  justify-between md:justify-center gap-22">
                  <label htmlFor="ensdescription">small description</label>
                  <textarea
                    className="p-2  rounded-[8px] w-[90%] lg:w-full min-h-[120px] border border-[#4fec5c] outline-none focus:border-[#48a850]"
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
              <div className="  w-[320px] sm:w-4/5 flex flex-col gap-1">
                <div className="px-4 flex flex-col  justify-between md:justify-center gap-22">
                  <label htmlFor="enldescription">large description</label>
                  <textarea
                    className="p-2 rounded-[8px] w-[90%] lg:w-full min-h-[120px] border border-[#4fec5c] outline-none focus:border-[#48a850]"
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
              <div className=" w-[320px] sm:w-4/5 flex flex-col md:flex-row gap-1">
                <div className="px-4 flex flex-col  justify-between md:justify-center gap-2">
                  <label htmlFor="size">size</label>
                  <input
                    className="p-2  rounded-[8px] w-1/2 lg:w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
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

        <span className="flex gap-4  w-1/2  px-20 mt-8 mb-4">
          <button
            type="submit"
            className="bg-green-400 rounded-full p-2 uppercase"
          >
            {t("createProduct")}
          </button>
        </span>
        {!isEn ? (
          <button onClick={() => setIsEn((prev) => !prev)} type="button">
            დაამატე პროდუქტი ინგლისურ ენაზე
          </button>
        ) : (
          <button onClick={() => setIsEn((prev) => !prev)} type="button">
            არ მსურს დამატება მეორე ენაზე
          </button>
        )}
      </form>
      <div className="flex w-1/5 items-end py-32  bottom-0 right-0 ">
        <ProductImageUpload onUploadComplete={handleImageUpload} />
      </div>
    </div>
  );
}
