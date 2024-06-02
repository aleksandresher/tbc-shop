"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, getProviders, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

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

export default function Login() {
  const router = useRouter();
  const { data, status: session } = useSession();
  const [providers, setProviders] = useState<Provider[]>([]);
  console.log(data, session);

  useEffect(() => {
    if (data?.user) {
      router.push("/en");
    }
  }, [data]);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      if (res) {
        const newProviders = Object.values(res);
        setProviders((prevProviders) => {
          if (JSON.stringify(prevProviders) !== JSON.stringify(newProviders)) {
            return newProviders;
          }
          return prevProviders;
        });
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
      <div className="w-4/5 flex justify-start">
        <h1 className="text-[32px] font-tbc-bold">ავტორიზაცია</h1>
      </div>
      {/* <form onSubmit={handleSubmit(onSubmit)} className="w-4/5 mt-7"> */}
      <form className="w-4/5 mt-7" onSubmit={handleSubmit(onSubmit)}>
        <div className=" flex flex-col gap-4">
          <div className="w-full flex items-center gap-2">
            <input
              placeholder="ელფოსტა"
              className="p-2  rounded-[8px] w-full h-[55px] border-[2px] border-[#dbdbdb] focus:border-[#3c74ff] focus:border-2 py-4 outline-none"
              id="email"
              {...register("email", {
                required: "this field is required",
              })}
            />
            {errors.email?.message && <span>{errors.email?.message}</span>}
          </div>

          <div className="flex items-center gap-2">
            <input
              placeholder="პაროლი"
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
        <div className="flex justify-end py-4 mt-4 mb-4">
          <p className=" font-tbc-bold">პაროლის აღდგენა</p>
        </div>
        <div className="w-full flex justify-center items-center bg-[#3c74ff] text-white p-4 rounded-[25px] hover:bg-[#5a88fd] cursor-pointer">
          <button type="submit">შესვლა</button>
        </div>
      </form>
      <div className="w-4/5 flex justify-between mt-6">
        <div className="flex items-center border-[1px] border-[#dbdbdb] px-6 py-2 rounded-[12px] gap-3">
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className="bg-[#38b000] hover:bg-[#008000] p-2 rounded-[8px] text-white"
              >
                <Image
                  src="/social/google.svg"
                  width={30}
                  height={30}
                  alt="google"
                />
                <p>Google</p>
              </button>
            ))}
        </div>
        <div className="flex items-center border-[1px] border-[#dbdbdb] px-6 py-2 rounded-[12px] gap-3">
          <Image
            src="/social/facebook.svg"
            width={30}
            height={30}
            alt="facebook"
          />
          <p>Facebook</p>
        </div>
        <div className="flex items-center border-[1px] border-[#dbdbdb] px-6 py-2 rounded-[12px] gap-3">
          <Image src="/social/apple.svg" width={30} height={30} alt="apple" />
          <p>Apple ID</p>
        </div>
      </div>
      <div className="flex p-6 mt-8 gap-2">
        <p className="text-[#9f9d9b] font-tbc-medium">არ გაქვს ანგარიში? - </p>
        {/* <Link href="/register">
          {" "}
          <p className="text-[#6d87ff] font-tbc-medium">შექმენი</p>
        </Link> */}
      </div>
    </div>
  );
}
