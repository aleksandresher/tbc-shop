"use client";
import { useQuery } from "@tanstack/react-query";
import { getStripeProducts } from "@/services/func";
import { useRouter } from "next/navigation";

export default function StripeProducts() {
  const router = useRouter();
  const { data, isLoading, error } = useQuery({
    queryKey: ["stripe"],
    queryFn: () => getStripeProducts(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  const handlePayment = async () => {
    try {
      const response = await fetch(`/api/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: data[0].id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to pay");
      }

      const resultedUrl = await response.json();

      console.log("Payment was successfull:", resultedUrl);
      router.push(`${resultedUrl}`);
    } catch (error) {
      console.error("Error in payment:", error);
    }
  };
  return (
    <section>
      <h1>Test Product 1</h1>
      <p>
        {(data[0].unit_amount / 100).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </p>
      <button onClick={() => handlePayment()}>Buy</button>
    </section>
  );
}
