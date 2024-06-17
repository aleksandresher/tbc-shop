"use client";
import { useQuery } from "@tanstack/react-query";
import { getAllBlog } from "@/services/func";

interface BlogProps {
  title: string;
  content: string;
  author: string;
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
  return <section>{JSON.stringify(data)}</section>;
}
