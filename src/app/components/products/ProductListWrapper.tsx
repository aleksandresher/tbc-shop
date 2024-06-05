import ProductsTabs from "./ProductsTab";

export default function ProductListWrapper({ userId }: { userId: string }) {
  return (
    <section>
      <ProductsTabs id={userId} />
    </section>
  );
}
