"use client";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/services/func";
import Image from "next/image";

interface LanguageDetails {
  title: string;
  category: string;
  country: string;
  brand: string;
  sdescription: string;
  ldescription: string;
  price: string;
  currency: string;
}

interface Languages {
  en: LanguageDetails;
  ka: LanguageDetails;
}

interface OrderItem {
  order_id: number;
  product_id: number;
  amount: number;
  created_at: string;
  image: string;
  numberofvotes: number;
  totalvotes: number;
  size: string;
  stripe_product_id: string | null;
  languages: Languages;
}

interface OrdersResponse {
  items: OrderItem[];
}

export default function OrderList() {
  const { data, isLoading, error } = useQuery<OrdersResponse>({
    queryKey: ["orders"],
    queryFn: () => getOrders(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  //   const filteredData =
  //     data[0]?.latest_charge.billing_details.email ===
  //     "aleksandre.shervashidze.2@ialiauni.edu.ge";

  console.log(data);
  return (
    <section>
      {/* {JSON.stringify(data[0].latest_charge.billing_details)} */}
      {/* {JSON.stringify(data)} */}
      {/* {data?.items?.map((orderItem: OrderItem) => (
        <div key={orderItem.order_id}>
          <p>{orderItem.languages.ka.title}</p>
          <Image
            src={orderItem.image}
            alt={orderItem.languages.ka.title}
            width={100}
            height={100}
          />
          <p>რაოდენობა: {orderItem.amount}</p>
        </div>
      ))} */}
    </section>
  );
}
