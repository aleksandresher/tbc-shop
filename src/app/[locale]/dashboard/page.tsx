import ProductListWrapper from "@/app/components/products/ProductListWrapper";
import ProductCreator from "@/app/components/products/create/ProductCreator";

export default function Dashboard() {
  return (
    <div className="py-18">
      <ProductCreator />
      <ProductListWrapper />
    </div>
  );
}
