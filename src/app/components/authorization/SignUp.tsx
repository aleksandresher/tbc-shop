"use client";
import { useForm } from "react-hook-form";

interface UserProps {
  name: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProps>();

  const onSubmit = async (data: UserProps) => {
    try {
      const response = await fetch("/api/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to create user");
      }
      const userData = await response.json();
    } catch (error) {
      console.log("Error creating user", error);
    }
  };

  return (
    <section>
      <div className="flex flex-col items-center p-12 gap-4">
        <div className="w-4/5 flex justify-start">
          <h1 className="text-[32px] font-tbc-bold">ავტორიზაცია</h1>
        </div>

        <form className="w-4/5 mt-7" onSubmit={handleSubmit(onSubmit)}>
          <div className=" flex flex-col gap-4">
            <div className="w-full flex items-center gap-2">
              <input
                placeholder="name"
                className="p-2  rounded-[8px] w-full h-[55px] border-[2px] border-[#dbdbdb] focus:border-[#3c74ff] focus:border-2 py-4 outline-none"
                id="name"
                {...register("name", {
                  required: "this field is required",
                })}
              />
              {errors.name?.message && <span>{errors.name?.message}</span>}
            </div>
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
          <div className="w-full flex justify-center items-center bg-[#3c74ff] text-white p-4 rounded-[25px] hover:bg-[#5a88fd] cursor-pointer">
            <button type="submit">რეგისტრაცია</button>
          </div>
        </form>
      </div>
    </section>
  );
}
