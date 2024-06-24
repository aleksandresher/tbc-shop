"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Image from "next/image";
import UserImageUpload from "../ImageUpload/UserImageUploader";
import { useState, useEffect } from "react";
const URL = process.env.NEXT_PUBLIC_BASE_URL;
import { useToast } from "@/components/ui/use-toast";
import { useI18n } from "@/app/locales/client";

interface UserTypes {
  name?: string | null;
  image?: string | null;
  email?: string | null;
}

export default function EditUser({ name, email, image }: UserTypes) {
  const t = useI18n();
  const { toast } = useToast();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [username, setUserName] = useState(name);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserTypes>({ defaultValues: { name, email } });

  useEffect(() => {
    setValue("name", name ?? "");
    setValue("email", email ?? "");
  }, [name, email, setValue]);

  const onSubmit = async (data: UserTypes) => {
    try {
      const response = await fetch(`${URL}/api/user/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data, email: data.email, image: imageUrl }),
      });

      if (!response.ok) {
        throw new Error("Failed to edit user info");
      }

      const userData = await response.json();
      toast({
        description: t("userUpdated"),
        variant: "default",
      });

      queryClient.invalidateQueries({ queryKey: ["user"] });

      console.log("User info edited successfully:", userData);
    } catch (error) {
      console.error("Error editing user info:", error);
    }
  };

  return (
    <section className="p-12 flex flex-col gap-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="username" className="font-medium">
            name
          </label>
          <input
            type="text"
            {...register("name", { required: true })}
            placeholder={name ?? ""}
            className="border p-1 h-[40px] rounded-sm"
            id="username"
          />
          {errors.name && (
            <span className="text-red-500">Name is required</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-medium">
            email
          </label>
          <input
            type="email"
            className="border p-1"
            id="email"
            readOnly
            placeholder={email ?? ""}
          />
        </div>
        <div className="flex gap-3">
          <Image
            src={image ?? "/no-image.svg"}
            alt="user image"
            width={200}
            height={200}
            className="rounded-[10px]"
          />
        </div>

        <button className="bg-green-600 p-2 mt-4 rounded-[10px]">
          {t("save")}
        </button>
      </form>
      <UserImageUpload onUploadComplete={(url) => setImageUrl(url)} />
    </section>
  );
}
