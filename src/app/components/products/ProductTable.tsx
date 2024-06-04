import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditProduct from "./edit/ProductEditor";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
}

interface ProductTableProps {
  data: Product[];
  userId: string;
}

export default function ProductTable({ data, userId }: ProductTableProps) {
  return (
    <Table>
      <TableCaption>A list of your products.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>title</TableHead>
          <TableHead>description</TableHead>
          <TableHead>price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((product: Product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">{product.title}</TableCell>
            <TableCell>{product.description}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>
              <EditProduct
                product={product}
                userId={userId}
                productId={product.id}
              />
            </TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
