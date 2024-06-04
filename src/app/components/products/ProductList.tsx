"use client";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/func";
import { useSession } from "next-auth/react";

export default function ProdoctList({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts({ id }),
  });

  if (isLoading) {
    return <div>loading</div>;
  }
  return <section>{JSON.stringify(data)}</section>;
}
