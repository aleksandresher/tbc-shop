import ProductListWrapper from "@/app/components/products/ProductListWrapper";
import ProductCreator from "@/app/components/products/create/ProductCreator";
import UserSideBar from "@/app/components/userdashboard/SideBar";

export default function Dashboard() {
  return (
    <div className="pt-8 px-14 bg-[#f1f3f6] h-lvh">
      <UserSideBar />
      {/* <ProductCreator /> */}
      {/* <ProductListWrapper /> */}
    </div>
  );
}
