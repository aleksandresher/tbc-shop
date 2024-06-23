"use client";
import Image from "next/image";
import Link from "next/link";

export default function SignIn({ locale }: { locale: string }) {
  return (
    <section className="flex items-center   p-2 gap-2 ">
      <Link href={`/${locale}/login`}>
        <Image
          src="/auth.png"
          width={48}
          height={30}
          alt="auth"
          className="w-[25px] h-[25px]"
        />
      </Link>
    </section>
  );
}
