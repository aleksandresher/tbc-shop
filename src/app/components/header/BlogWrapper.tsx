import Link from "next/link";
import Image from "next/image";

export default function BlogWrapper({ locale }: { locale: string }) {
  return (
    <Link href={`/${locale}/blog`}>
      <section className="flex items-center gap-1">
        <Image src="/blog.svg" width={30} height={30} alt="blog icon" />
        <h1>Blog</h1>
      </section>
    </Link>
  );
}
