import CreateProduct from "@/app/components/products/ProductCreator";
import ProductListWrapper from "@/app/components/products/ProductListWrapper";

export default function Dashboard({ params }: { params: { userId: string } }) {
  return (
    <div className="py-18">
      <CreateProduct />
      <ProductListWrapper />
    </div>
  );
}
