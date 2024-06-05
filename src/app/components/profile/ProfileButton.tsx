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

export default function ProfileButton({ locale }: { locale: string }) {
  const [userId, setUserId] = useState("");
  const { data, status: session } = useSession();
  const email = data?.user.email as string;
  async function getUser({ email }: { email: string }) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/get-user?email=${email}`,
        {}
      );
      const { user } = await response.json();

      setUserId(user.id);
      localStorage.setItem("userId", user.id);

      return user;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }

  useEffect(() => {
    getUser({ email });
  }, [data]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {data?.user?.image ? (
          <Image
            src={data?.user.image}
            width={30}
            height={30}
            alt="user image"
            className="rounded-lg"
          />
        ) : (
          <Image src="/auth.png" width={30} height={30} alt="user icon" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={`${locale}/dashboard/${userId}`}>Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
