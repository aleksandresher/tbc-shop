"use client";
import Image from "next/image";
import { useCart } from "@/app/providers/ContextProvider";
import { checkUserAuthentication } from "@/services/func";
import { useRouter } from "next/navigation";

export default function CartWrapper({ locale }: { locale: string }) {
  const { setOpened } = useCart();
  const router = useRouter();

  const handleClick = async () => {
    const authStatus = await checkUserAuthentication();
    if (authStatus === "authenticated") {
      setOpened(true);
      router.push(`${locale}/dashboard`);
    } else {
      console.log("User is unauthenticated");
    }
  };
  return (
    <Image
      src="/basket.svg"
      width={30}
      height={30}
      alt="cart icon"
      onClick={handleClick}
    />
  );
}
