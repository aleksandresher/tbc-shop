"use client";
import { loadSingleBlog } from "@/services/func";
import { useQuery } from "@tanstack/react-query";

export default function SingleBlogCard({
  id,
  locale,
}: {
  id: string;
  locale: string;
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["blog"],
    queryFn: () => loadSingleBlog({ id }),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }
  return <section>{JSON.stringify(data)}</section>;
}
