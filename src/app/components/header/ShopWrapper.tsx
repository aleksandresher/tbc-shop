import Link from "next/link";
import Image from "next/image";

export default function ShopWrapper({ locale }: { locale: string }) {
  return (
    <Link href={`/${locale}/shop`}>
      <section className="flex items-center gap-1">
        <Image src="/store.svg" width={30} height={30} alt="store icon" />
        <h1>Store</h1>
      </section>
    </Link>
  );
}
