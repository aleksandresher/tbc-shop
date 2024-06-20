"use client";
import Image from "next/image";
import Link from "next/link";

export default function SignIn({ locale }: { locale: string }) {
  return (
    <section className="flex items-center border-[1px] border-[#6699CC]  p-2 gap-2 rounded-[15px]">
      <Link href={`/login`}>
        <Image src="/auth.png" width={20} height={20} alt="auth" />
      </Link>
    </section>
  );
}
