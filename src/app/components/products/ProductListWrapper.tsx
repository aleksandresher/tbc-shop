"use client";
import { useSession } from "next-auth/react";
import ProdoctList from "./ProductList";

export default function ProductListWrapper() {
  const { data, status } = useSession();
  const email = data?.user.email || "";
  return (
    <section>
      <ProdoctList email={email} />
    </section>
  );
}
