"use client";
import Image from "next/image";
import Link from "next/link";
import BlogSearchBar from "./BlogSearch";
import { useState } from "react";

interface Blog {
  id: string;
  title: string;
  image: string;
  content: string;
  author: string;
}

export default function BlogListMain({ data }: { data: Blog[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBlogs = data.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <section>
      <BlogSearchBar onSearch={setSearchTerm} />
      <div className="grid grid-cols-4 p-12">
        {filteredBlogs?.map((blog: Blog) => (
          <div key={blog.id} className="flex flex-col gap-2 items-center p-2">
            <h1>{blog.title}</h1>
            <p>{blog.content}</p>
            <Image
              src={blog.image}
              alt={blog.title}
              width={100}
              height={100}
              priority
            />
            <Link href={`blog/${blog.id}`}>
              <button className="border border-gray-200 p-2">Read more</button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
