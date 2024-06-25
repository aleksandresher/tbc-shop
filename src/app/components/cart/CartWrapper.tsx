"use client";
import { useCart } from "@/app/providers/ContextProvider";
import { checkUserAuthentication } from "@/services/func";
import { useRouter } from "next/navigation";
import BasketIcon from "../svg/BasketIcon";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "@/services/func";
import Image from "next/image";

export default function CartWrapper({ locale }: { locale: string }) {
  const { data: sessionData, status } = useSession();

  const { setOpened, itemCount } = useCart();
  const router = useRouter();

  const {
    data: cartData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
    enabled: !!sessionData?.user,
  });

  const handleClick = async () => {
    const authStatus = await checkUserAuthentication();
    if (authStatus === "authenticated") {
      setOpened(true);
      router.push(`/${locale}/dashboard`);
    } else {
      console.log("User is unauthenticated");
    }
  };
  return (
    <section className="relative">
      <div onClick={() => handleClick()} className=" cursor-pointer">
        <BasketIcon />
        {/* <Image
          src="/bag.svg"
          alt="basket icon"
          width={25}
          height={25}

          // className="fill-[#000] dark:fill-[#fff] stroke-black dark:stroke-white"
        /> */}
        <span className="absolute bottom-4 text-black font-bold">
          {cartData?.items.length}
        </span>
      </div>
    </section>
  );
}
