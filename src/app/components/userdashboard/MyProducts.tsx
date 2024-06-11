"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MyProductList from "./MyProductList";
import MySearch from "./MySearch";

export default function MyProducts() {
  return (
    <section>
      {" "}
      <Card>
        <CardHeader>
          <CardTitle>My products</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <MySearch />
          <MyProductList />
        </CardContent>
        {/* <CardFooter>
          <Button>Save changes</Button>
        </CardFooter> */}
      </Card>
    </section>
  );
}
