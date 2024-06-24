"use client";
import { useForm } from "react-hook-form";
const URL = process.env.NEXT_PUBLIC_BASE_URL;
import { useI18n } from "@/app/locales/client";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
interface UserProps {
  name: string;
  email: string;
  password: string;
}

export default function SignUp({ locale }: { locale: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProps>();
  const t = useI18n();
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (data: UserProps) => {
    try {
      const response = await fetch(`${URL}/api/user/create`, {
        cache: "no-cache",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.status === 409) {
        toast({
          description: t("alreadyexistmail"),
          variant: "destructive",
        });
        throw new Error("User with this email already exists");
      }
      if (!response.ok) {
        console.log(response);
        toast({ description: "Registration failed", variant: "destructive" });
        throw new Error("Failed to create user");
      }
      const userData = await response.json();
      toast({
        description: t("registeredSuccess"),
        variant: "default",
      });
      router.push(`/${locale}/login`);
    } catch (error) {
      console.log("Error creating user", error);
    }
  };

  return (
    <section>
      <div className="flex flex-col items-center p-12 gap-4">
        <div className="w-full sm:w-4/5 flex justify-center ">
          <h1 className="text-[32px] font-tbc-bold">{t("registration")}</h1>
        </div>

        <form
          className="w-full sm:w-4/5 mt-7 max-w-[800px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className=" flex flex-col gap-6">
            <div className="w-full flex flex-col items-center gap-2">
              <label htmlFor="name" hidden>
                {t("name")}
              </label>
              <input
                placeholder={t("name")}
                className="p-2  rounded-[8px] w-full h-[55px] border-[2px] border-[#dbdbdb] focus:border-[#3c74ff] focus:border-2 py-4 outline-none"
                id="name"
                {...register("name", {
                  required: t("requiredField"),
                })}
              />
              {errors.name?.message && (
                <span className="text-red-400">{errors.name?.message}</span>
              )}
            </div>
            <div className="w-full flex flex-col items-center gap-2">
              <label htmlFor="email" hidden>
                {t("email")}
              </label>
              <input
                placeholder={t("email")}
                className="p-2  rounded-[8px] w-full h-[55px] border-[2px] border-[#dbdbdb] focus:border-[#3c74ff] focus:border-2 py-4 outline-none"
                id="email"
                {...register("email", {
                  required: t("requiredField"),
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: t("invalidFormat"),
                  },
                })}
              />
              {errors.email?.message && (
                <span className="text-red-400">{errors.email?.message}</span>
              )}
            </div>

            <div className="flex flex-col items-center gap-2">
              <label htmlFor="password" hidden>
                {t("password")}
              </label>
              <input
                placeholder={t("password")}
                type="password"
                className="w-full p-2 h-[55px]  rounded-[8px] border-[2px] border-[#dbdbdb] focus:border-[#3c74ff] focus:border-2 py-4 outline-none"
                id="password"
                {...register("password", {
                  required: t("requiredField"),
                })}
              />
              {errors.password?.message && (
                <span className="text-red-400">{errors.password?.message}</span>
              )}
            </div>
          </div>
          <div className="w-full flex justify-center items-center bg-[#000] text-white p-4 rounded-[10px] hover:bg-[#141414] cursor-pointer mt-4">
            <button type="submit">{t("registration")}</button>
          </div>
        </form>
      </div>
    </section>
  );
}
