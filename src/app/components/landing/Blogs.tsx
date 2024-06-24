"use client";
import { useQuery } from "@tanstack/react-query";
import BlogListMain from "@/app/components/blogs/BlogListMain";
import { getAllBlog } from "@/services/func";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/app/locales/client";
import BlogsGallerySkeleton from "../skeletons/BlogsSkeleton";

interface Blog {
  id: string;
  title: string;
  image: string;
  content: string;
  author: string;
}

export default function BlogsGallery({ locale }: { locale: string }) {
  const t = useI18n();
  const { data, isLoading, error } = useQuery({
    queryKey: ["blog"],
    queryFn: () => getAllBlog(),
  });

  if (isLoading) {
    return <BlogsGallerySkeleton />;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section className="flex flex-col md:p-12 gap-8 mt-6">
      <div className="px-14">
        {" "}
        <h2 className="text-2xl">{t("blog")}</h2>
      </div>

      <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3   gap-x-3 gap-y-4">
        {data?.map((blog: Blog) => (
          <div
            key={blog.id}
            className="flex flex-col gap-2 items-center justify-between px-4 bg-[#fff] rounded-[10px] py-8 "
          >
            <h1 className="text-center">{blog.title}</h1>

            <Image
              src={blog.image}
              width={500}
              height={500}
              alt={blog.title}
              className="object-cover w-[300px] h-[300px] mt-3 "
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) "
              priority={true}
            />
            <Link href={`/${locale}/blog/${blog.id}`} className="mt-3">
              <button className="border border-gray-200 bg-[#000] p-2 rounded-[4px]">
                <p className="text-white">{t("readMore")}</p>
              </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
