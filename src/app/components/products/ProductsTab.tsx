"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FaceProductTable from "./FaceProductsTable";
import BodyProductTable from "./BodyProductsTable";

export default function ProductsTabs({ id }: { id: string }) {
  return (
    <Tabs defaultValue="face" className="w-full">
      <TabsList>
        <TabsTrigger value="face">Face Products</TabsTrigger>
        <TabsTrigger value="body">Body Products</TabsTrigger>
      </TabsList>
      <TabsContent value="face">
        <FaceProductTable id={id} />
      </TabsContent>
      <TabsContent value="body">
        <BodyProductTable id={id} />
      </TabsContent>
    </Tabs>
  );
}
