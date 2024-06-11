import ProductListWrapper from "@/app/components/products/ProductListWrapper";
import ProductCreator from "@/app/components/products/create/ProductCreator";
import UserSideBar from "@/app/components/userdashboard/SideBar";

export default function Dashboard() {
  return (
    <div className="py-18">
      <UserSideBar />
      {/* <ProductCreator /> */}
      {/* <ProductListWrapper /> */}
    </div>
  );
}
