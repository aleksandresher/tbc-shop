"use client";
import { useCart } from "@/app/providers/ContextProvider";
import { checkUserAuthentication } from "@/services/func";
import { useRouter } from "next/navigation";
import BasketIcon from "../svg/BasketIcon";

export default function CartWrapper({ locale }: { locale: string }) {
  const { setOpened } = useCart();
  const router = useRouter();

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
    <section>
      <div onClick={() => handleClick()} className=" cursor-pointer">
        <BasketIcon />
      </div>
    </section>
  );
}
