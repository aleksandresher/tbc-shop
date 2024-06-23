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

interface User {
  email: string;
  role: string;
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
    url = `${locale}/admin`;
  } else {
    url = `${locale}/dashboard`;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {data?.user?.image ? (
          <Image
            src={data?.user.image}
            width={30}
            height={30}
            alt="user image"
            className="rounded-[6px]"
          />
        ) : (
          <ProfileIcon />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-8 bg-gray-50">
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
