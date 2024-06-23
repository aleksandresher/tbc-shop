"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, getProviders, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/app/locales/client";

export type UserProps = {
  email: string;
  password: string;
};

interface Provider {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl?: string;
  namespace?: string;
  clientId?: string;
}

export default function Login({ locale }: { locale: string }) {
  const router = useRouter();
  const { data, status: session } = useSession();
  const [providers, setProviders] = useState<Provider[]>([]);
  const t = useI18n();

  useEffect(() => {
    if (data?.user) {
      router.push("/en");
    }
  }, [data, router]);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      if (res) {
        const filteredProviders = Object.values(res).filter(
          (provider) => provider.id === "google"
        );
        setProviders(filteredProviders);
      }
    })();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProps>();

  const onSubmit = async (formData: UserProps) => {
    console.log(formData);
    signIn("credentials", {
      email: formData.email,
      password: formData.password,
    });
  };
  return (
    <div className="flex flex-col items-center p-12 gap-4">
      <div className="w-fulll sm:w-4/5 flex justify-center ">
        <h1 className="text-[32px] font-tbc-bold">{t("authorization")}</h1>
      </div>
      <form
        className="w-full max-w-[800px] sm:w-4/5 mt-7"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className=" flex flex-col gap-4">
          <div className="w-full flex items-center gap-2">
            <label htmlFor="email" hidden>
              {t("email")}
            </label>
            <input
              placeholder={t("email")}
              className="p-2  rounded-[8px] w-full h-[55px] border-[2px] border-[#dbdbdb] focus:border-[#3c74ff] focus:border-2 py-4 outline-none"
              id="email"
              {...register("email", {
                required: "this field is required",
              })}
            />
            {errors.email?.message && <span>{errors.email?.message}</span>}
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="password" hidden>
              {t("password")}
            </label>
            <input
              placeholder={t("password")}
              type="password"
              className="w-full p-2 h-[55px]  rounded-[8px] border-[2px] border-[#dbdbdb] focus:border-[#3c74ff] focus:border-2 py-4 outline-none"
              id="password"
              {...register("password", {
                required: "this field is required",
              })}
            />
            {errors.password?.message && (
              <span>{errors.password?.message}</span>
            )}
          </div>
        </div>
        <div className="flex justify-end py-4 mt-1 mb-4">
          <p className=" font-tbc-bold">{t("reset")}</p>
        </div>
        <div className="w-full flex justify-center items-center bg-[#000] text-white p-4 rounded-[10px] hover:bg-[#111113] cursor-pointer dark:bg-[#f1f3f6]">
          <button
            type="submit"
            className="text-lg font-tbc-medium tracking-wide dark:text-black"
          >
            {t("login")}
          </button>
        </div>
      </form>
      <div className="w-4/5 flex  justify-center mt-6">
        <div className="flex items-center justify-center rounded-[10px] gap-3">
          {providers.length > 0 && (
            <button
              type="button"
              onClick={() => signIn(providers[0].id)}
              className="bg-[#fff] hover:bg-[#f1f3f6] border border-black px-8 py-3 rounded-[8px] text-white flex gap-4 items-center justify-center"
            >
              <Image
                src="/social/google.svg"
                width={20}
                height={20}
                alt="google"
              />
              <p className="font-tbc-regular text-black">
                Continue with Google
              </p>
            </button>
          )}
        </div>
      </div>
      <div className="flex p-6 mt-8 gap-2">
        <p className="text-[#9f9d9b] font-tbc-medium">{t("notregister")} - </p>
        <Link href={`/${locale}/register`}>
          <p className="text-[#101114] font-tbc-medium dark:text-white">
            {t("create")}
          </p>
        </Link>
      </div>
    </div>
  );
}
