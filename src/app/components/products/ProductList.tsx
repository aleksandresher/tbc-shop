"use client";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/func";
import ProductTable from "./ProductTable";

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
      <ProductTable data={data} />
    </section>
  );
}
