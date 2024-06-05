"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditBodyProduct from "./edit/BodyProductEditor";
import DeleteProduct from "./delete/DeleteProduct";
import { useQuery } from "@tanstack/react-query";
import { getBodyProducts } from "@/services/func";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  numberofvotes: number;
  totalvotes: number;
}

interface BodyProductTableProps {
  id: string;
}

export default function BodyProductTable({ id }: BodyProductTableProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["body"],
    queryFn: () => getBodyProducts({ id }),
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
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((product: Product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">{product.title}</TableCell>
            <TableCell>{product.description}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>
              <EditBodyProduct
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
