import ProductListWrapper from "@/app/components/products/ProductListWrapper";
import ProductCategoryMenu from "@/app/components/products/menu/ProductCategoryMenu";

export default function Dashboard() {
  return (
    <div className="py-18">
      <ProductCategoryMenu />
      <ProductListWrapper />
    </div>
  );
}
