"use client";
import { useQuery } from "@tanstack/react-query";
import BlogListMain from "@/app/components/blogs/BlogListMain";
import { getAllBlog } from "@/services/func";
import BlogsGallerySkeleton from "@/app/components/skeletons/BlogsSkeleton";

const URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function BlogPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["blog"],
    queryFn: () => getAllBlog(),
  });

  if (isLoading) {
    return (
      <div>
        <BlogsGallerySkeleton />
      </div>
    );
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  return <BlogListMain data={data} />;
}
