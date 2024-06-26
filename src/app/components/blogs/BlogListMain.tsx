"use client";
import Image from "next/image";
import Link from "next/link";
import BlogSearchBar from "./BlogSearch";
import { useState } from "react";
import { useI18n } from "@/app/locales/client";

interface Blog {
  id: string;
  title: string;
  image: string;
  content: string;
  author: string;
}

export default function BlogListMain({ data }: { data: Blog[] }) {
  const t = useI18n();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBlogs = data.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-6">
      <div className="flex justify-start px-12">
        <BlogSearchBar onSearch={setSearchTerm} />
      </div>

      <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 p-4 md:p-12  gap-x-3 gap-y-4">
        {filteredBlogs?.map((blog: Blog) => (
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
            <Link
              href={`blog/${blog.id}`}
              className="mt-3"
              aria-label={`read more about ${blog.title}`}
            >
              <span className="hidden">{blog.title}</span>
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
