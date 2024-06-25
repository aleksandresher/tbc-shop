"use client";
import Image from "next/image";
import Link from "next/link";
import ProfileIcon from "../svg/Profile";

export default function SignIn({ locale }: { locale: string }) {
  return (
    <section className="flex    p-2 gap-2 ">
      <Link href={`/${locale}/login`}>
        {/* <Image
          src="/user1.svg"
          width={100}
          height={60}
          alt="user icon"
          className=" w-[50px] h-[40px] md:w-[25px] md:h-[25px]"
        /> */}
        <ProfileIcon />
      </Link>
    </section>
  );
}
