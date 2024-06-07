import ProductListWrapper from "@/app/components/products/ProductListWrapper";
import ProductCategoryMenu from "@/app/components/products/menu/ProductCategoryMenu";
import ImageUploadPage from "@/app/components/ImageUpload/ImageUploader";
import { Images } from "../../components/ImageUpload/ImageShow";

export default function Dashboard() {
  return (
    <div className="py-18">
      <ProductCategoryMenu />
      <ProductListWrapper />
      <ImageUploadPage />
      {/* <Images /> */}
    </div>
  );
}
