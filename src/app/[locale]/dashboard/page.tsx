import ProductListWrapper from "@/app/components/products/ProductListWrapper";
import ProductCreator from "@/app/components/products/create/ProductCreator";
import UserSideBar from "@/app/components/userdashboard/SideBar";

interface ParamsType {
  locale: string;
}

export default function Dashboard({ params }: { params: ParamsType }) {
  return (
    <div className="pt-8 px-14 bg-[#f1f3f6] h-lvh">
      <UserSideBar locale={params.locale} />
      {/* <ProductCreator /> */}
      {/* <ProductListWrapper /> */}
    </div>
  );
}
