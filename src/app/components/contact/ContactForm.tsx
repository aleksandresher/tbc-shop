"use client";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

interface ContactMessage {
  title: string;
  message: string;
  email: string;
  token: string;
}

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ContactMessage>();
  const queryClient = useQueryClient();

  const onSubmit = async (data: ContactMessage) => {
    try {
      const res = await fetch("/api/contact/send", {
        method: "POST",
        body: JSON.stringify({
          title: data.title,
          message: data.message,
          email: data.email,
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
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full">
          <section className="flex flex-col p-3 gap-4 w-1/2">
            <div className="flex flex-col gap-1">
              <div className="w-full flex items-center justify-between gap-2">
                <label htmlFor="title">სათაური</label>
                <input
                  className="p-2 rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
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
              <div className="w-full flex items-center justify-between gap-2">
                <label htmlFor="message">წერილი</label>
                <input
                  className="p-2 rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
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
              <div className="w-full flex items-center justify-between gap-2">
                <label htmlFor="email">
                  თქვენი მეილი, თუ გსურთ რომ დაგიკავშირდეთ
                </label>
                <input
                  className="p-2 rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
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
        </div>
        <span className="flex gap-4">
          <button
            type="submit"
            className="bg-green-400 rounded-full p-2 uppercase"
          >
            გაგზავნა
          </button>
        </span>
      </form>
    </section>
  );
}
