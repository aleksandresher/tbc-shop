"use client";
import Image from "next/image";
import Link from "next/link";
import ProfileIcon from "../svg/Profile";

export default function SignIn({ locale }: { locale: string }) {
  return (
    <section className="flex items-center   p-2 gap-2 ">
      <Link href={`/${locale}/login`}>
        <Image src="/user.svg" width={30} height={30} alt="user icon" />
        <ProfileIcon />
      </Link>
    </section>
  );
}
