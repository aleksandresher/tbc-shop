import ProdoctList from "./ProductList";

export default function ProductListWrapper({ userId }: { userId: string }) {
  return (
    <section>
      <ProdoctList id={userId} />
    </section>
  );
}
