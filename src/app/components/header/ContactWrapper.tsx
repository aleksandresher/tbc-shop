import Image from "next/image";
import Link from "next/link";

export default function ContactWrapper({ locale }: { locale: string }) {
  return (
    <Link href={`/${locale}/contanct`} className="flex items-center gap-1">
      <Image src="/contact.svg" width={30} height={30} alt="contact icon" />
      <h1>Contact</h1>
    </Link>
  );
}
