"use client";
import { useQuery } from "@tanstack/react-query";

interface ItemProps {
  id: number;
  totalvotes: number;
  numberofvotes: number;
}

export default function SingleProductRating({
  productId,
}: {
  productId: number;
}) {
  console.log("productId", productId);
  const { data, isLoading, error } = useQuery<ItemProps>({
    queryKey: ["user"],
    queryFn: () => getRating({ productId }),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading rating</p>;
  async function getRating({ productId }: { productId: number }) {
    try {
      const response = await fetch(
        `${URL}/api/products/rate?productId=${productId}`,
        {}
      );
      const { item } = await response.json();

      return item;
    } catch (error) {
      console.error("Error fetching item:", error);
      return [];
    }
  }
  return (
    <section>
      <p className="text-sm">{data?.totalvotes}</p>
      <p className="text-sm">({data?.numberofvotes})</p>
    </section>
  );
}
