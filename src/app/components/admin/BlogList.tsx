"use client";
import { useQuery } from "@tanstack/react-query";
import { getAllBlog } from "@/services/func";
import EditBlog from "./EditBlog";
import Image from "next/image";
import DeleteBlog from "./DeleteBlog";

interface BlogProps {
  title: string;
  content: string;
  author: string;
  id: number;
  image: string;
}

export default function BlogList() {
  const { data, isLoading, error } = useQuery<BlogProps[]>({
    queryKey: ["blogs"],
    queryFn: () => getAllBlog(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <section className="p-4">
      {data?.map((blog) => (
        <div key={blog.id} className="flex gap-4 items-center">
          <h1>Title:{blog.title}</h1>
          <p>{blog.content}</p>
          <p>Author: {blog.author}</p>
          <Image src={blog.image} alt={blog.title} width={50} height={50} />
          <EditBlog content={blog} />
          <DeleteBlog product_id={blog.id} />
        </div>
      ))}
      {/* <EditBlog content={data}/> */}
    </section>
  );
}
