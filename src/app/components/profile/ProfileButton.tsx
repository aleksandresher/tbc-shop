"use client";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
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

interface User {
  email: string;
  role: string;
  // Add other user properties if needed
}

export default function ProfileButton({ locale }: { locale: string }) {
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
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={user?.role === "admin" ? `/admin` : `/dashboard`}>
            {user?.role === "admin" ? "Admin Dashboard" : "Dashboard"}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
