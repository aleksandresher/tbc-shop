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

export default function ProfileButton({ locale }: { locale: string }) {
  const { data, status: session } = useSession();

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
          <Link href={`${locale}/dashboard`}>Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
