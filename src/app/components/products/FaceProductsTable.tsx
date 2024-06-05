import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditFaceProduct from "./edit/FaceProductEditor";
import DeleteProduct from "./delete/DeleteProduct";
import { useQuery } from "@tanstack/react-query";
import { getFaceProducts } from "@/services/func";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  numberofvotes: number;
  totalvotes: number;
  amount: number;
}

interface FaceProductTableProps {
  id: string;
}

export default function FaceProductTable({ id }: FaceProductTableProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["face"],
    queryFn: () => getFaceProducts({ id }),
  });

  if (isLoading) {
    return <div>loading</div>;
  }
  return (
    <Table>
      <TableCaption>A list of your products.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>title</TableHead>
          <TableHead>description</TableHead>
          <TableHead>price</TableHead>
          <TableHead>amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((product: Product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">{product.title}</TableCell>
            <TableCell>{product.description}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product.amount}</TableCell>
            <TableCell>
              <EditFaceProduct
                product={product}
                userId={id}
                productId={product.id}
              />
            </TableCell>
            <TableCell>
              <DeleteProduct productId={product.id} userId={id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
