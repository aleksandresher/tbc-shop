import CreateProduct from "@/app/components/products/ProductCreator";

export default function Dashboard({ params }: { params: { userId: string } }) {
  return (
    <div className="py-18">
      <CreateProduct />
    </div>
  );
}
