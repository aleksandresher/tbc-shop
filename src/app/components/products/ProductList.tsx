"use client";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/func";
import { useSession } from "next-auth/react";

interface ItemProps {
  title: string;
  description: string;
  price: number;
  id: number;
}

export default function ProdoctList({ id }: { id: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts({ id }),
  });

  if (isLoading) {
    return <div>loading</div>;
  }
  return (
    <section>
      {data?.map((item: ItemProps) => {
        return (
          <div key={item.id}>
            <h1>Title {item.title}</h1>
            <p> Description {item.description}</p>
            <p> Price{item.price}</p>
          </div>
        );
      })}
    </section>
  );
}
