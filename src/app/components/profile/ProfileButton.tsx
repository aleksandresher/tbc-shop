"use client";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import ProfileIcon from "../svg/Profile";
const URL = process.env.NEXT_PUBLIC_BASE_URL;
import { useI18n } from "@/app/locales/client";
import { getLocalePath } from "@/utils/getLocalePath";

interface User {
  email: string;
  role: string;
  image: string;
  // Add other user properties if needed
}

export default function ProfileButton({ locale }: { locale: string }) {
  const t = useI18n();
  const router = useRouter();
  const { data, status: session } = useSession();
  const [user, setUser] = useState<User | null>(null);

  const email = data?.user.email as string;
  async function getUser({ email }: { email: string }) {
    try {
      const response = await fetch(`${URL}/api/get-user?email=${email}`, {});
      const { user } = await response.json();
      setUser(user);

      return user;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }

  useEffect(() => {
    if (email) {
      getUser({ email }).then(setUser);
    }
  }, [email]);

  let url = "";
  if (user?.role === "admin") {
    url = `${getLocalePath(locale, "/admin")}`;
  } else {
    url = `${getLocalePath(locale, "/dashboard")}`;
  }

  let imageUrl = user?.image || data?.user?.image || null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none border-none">
        {imageUrl ? (
          <Image
            src={imageUrl}
            width={30}
            height={30}
            alt="user image"
            className="rounded-[6px] h-[25px] w-[25px] outline-none"
          />
        ) : (
          <ProfileIcon />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-50 bg-gray-50">
        <DropdownMenuLabel>{t("myaccount")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={url}>
            {user?.role === "admin" ? t("admindashboard") : t("dashboard")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()}>
          {t("logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
