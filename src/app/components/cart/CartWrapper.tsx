"use client";
import { useCart } from "@/app/providers/ContextProvider";
import { checkUserAuthentication } from "@/services/func";
import { useRouter } from "next/navigation";
import BasketIcon from "../svg/BasketIcon";

import { useQuery } from "@tanstack/react-query";
import { getCart } from "@/services/func";

export default function CartWrapper({ locale }: { locale: string }) {
  const { setOpened, itemCount } = useCart();
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
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
        <span className="absolute bottom-4 text-black font-bold">
          {data?.items.length}
        </span>
      </div>
    </section>
  );
}
