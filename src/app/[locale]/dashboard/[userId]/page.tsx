import CreateProduct from "@/app/components/products/create/FaceProduct";
import ProductListWrapper from "@/app/components/products/ProductListWrapper";
import ProductCategoryMenu from "@/app/components/products/menu/ProductCategoryMenu";

export default function Dashboard({ params }: { params: { userId: string } }) {
  return (
    <div className="py-18">
      <ProductCategoryMenu />
      <ProductListWrapper userId={params.userId} />
    </div>
  );
}
