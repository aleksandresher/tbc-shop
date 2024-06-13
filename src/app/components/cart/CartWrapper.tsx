"use client";
import Image from "next/image";
import { useCart } from "@/app/providers/ContextProvider";
import { checkUserAuthentication } from "@/services/func";
import { useRouter } from "next/navigation";
import CartHoverCard from "./CartHoverCard";

export default function CartWrapper({ locale }: { locale: string }) {
  const { setOpened } = useCart();
  const router = useRouter();

  const handleClick = async () => {
    const authStatus = await checkUserAuthentication();
    if (authStatus === "authenticated") {
      setOpened(true);
      router.push(`/dashboard`);
    } else {
      console.log("User is unauthenticated");
    }
  };
  return (
    <CartHoverCard handleClick={handleClick} locale={locale} />
    // <Image
    //   src="/basket.svg"
    //   width={30}
    //   height={30}
    //   alt="cart icon"
    //   onClick={handleClick}
    // />
  );
}
