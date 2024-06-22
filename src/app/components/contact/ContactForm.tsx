"use client";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import EmailIcon from "../svg/Email";
import MapIcon from "../svg/Map";
import PhoneIcon from "../svg/Phone";
const URL = process.env.NEXT_PUBLIC_BASE_URL;
import { useI18n } from "@/app/locales/client";

interface ContactMessage {
  title: string;
  message: string;
  email: string;
  token: string;
  name: string;
}

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ContactMessage>();
  const queryClient = useQueryClient();
  const t = useI18n();

  const onSubmit = async (data: ContactMessage) => {
    try {
      const res = await fetch(`${URL}/api/contact/send`, {
        method: "POST",
        body: JSON.stringify({
          title: data.title,
          message: data.message,
          email: data.email,
          name: data.name,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      const responseData = await res.json();
      console.log(responseData);

      queryClient.invalidateQueries({ queryKey: ["contact"] });

      console.log("Message sent successfully:", responseData);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <section className="flex flex-col py-12 items-center pb-8  h-screen ">
      <div className="w-full flex flex-col md:flex-row rounded-[8px] ">
        <div className="w-full md:w-1/2 flex flex-col gap-12 justify-center items-center ">
          <h1 className="text-lg md:text-3xl text-center">
            Let`s get in touch With Us
          </h1>
          <section className="flex flex-col gap-4 p-4">
            <span className="flex items-center gap-4">
              <EmailIcon />
              <p className="text-lg font-tbc-medium">random@gmail.com</p>
            </span>
            <span className="flex items-center gap-4">
              <MapIcon />
              <p className="text-lg font-tbc-medium">Tbilisi, Georgia</p>
            </span>
            <span className="flex items-center gap-4">
              <PhoneIcon />
              <p className="text-lg font-tbc-medium">+995 595 234 456</p>
            </span>
          </section>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full md:w-1/2  flex flex-col justify-center items-center"
        >
          <section className="flex flex-col p-3 gap-4 items-center justify-center">
            <div className="flex flex-col gap-1">
              <div className="w-[300px] md:w-[400px] flex flex-col gap-1 ">
                <label htmlFor="name">{t("name")}</label>
                <input
                  className="p-2 rounded-[8px]  border border-[#4fec5c] outline-none focus:border-[#48a850]"
                  id="name"
                  type="text"
                  {...register("name", {
                    required: "სახელი სავალდებულოა",
                  })}
                />
              </div>
              <span className="flex justify-end px-2">
                {errors.name?.message && (
                  <p className="text-red-600">{errors.name?.message}</p>
                )}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="w-[300px] md:w-[400px] flex flex-col gap-1">
                <label htmlFor="title">{t("title")}</label>
                <input
                  className="p-2 rounded-[8px]  border border-[#4fec5c] outline-none focus:border-[#48a850]"
                  id="title"
                  type="text"
                  {...register("title", {
                    required: "სათაური სავალდებულოა",
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
              <div className="w-[300px] md:w-[400px] flex flex-col gap-1">
                <label htmlFor="message">{t("message")}</label>
                <input
                  className="p-2 rounded-[8px] h-[100px] border border-[#4fec5c] outline-none focus:border-[#48a850]"
                  type="text"
                  id="message"
                  {...register("message", {
                    required: "წერილის ტექსტი სავალდებულოა",
                  })}
                />
              </div>
              <span className="flex justify-end px-2">
                {errors.message?.message && (
                  <p className="text-red-600">{errors.message?.message}</p>
                )}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="w-[300px] md:w-[400px] flex flex-col gap-1">
                <label htmlFor="email">{t("ifcontactback")}</label>
                <input
                  className="p-2 rounded-[8px]  border border-[#4fec5c] outline-none focus:border-[#48a850]"
                  id="email"
                  type="email"
                  {...register("email", {
                    pattern: {
                      value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "მიუთითეთ ვალიდური მეილი",
                    },
                  })}
                />
              </div>
              <span className="flex justify-end px-2">
                {errors.email?.message && (
                  <p className="text-red-600">{errors.email?.message}</p>
                )}
              </span>
            </div>
          </section>

          <span className="flex gap-4 w-[200px]">
            <button
              type="submit"
              className="w-full bg-green-400 rounded-[4px] p-2 uppercase"
            >
              გაგზავნა
            </button>
          </span>
        </form>
      </div>
    </section>
  );
}
