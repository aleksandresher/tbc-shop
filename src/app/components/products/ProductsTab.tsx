"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FaceProductTable from "./FaceProductsTable";
import BodyProductTable from "./BodyProductsTable";

export default function ProductsTabs() {
  return (
    <Tabs defaultValue="face" className="w-full">
      <TabsList>
        <TabsTrigger value="face">Skin Products</TabsTrigger>
        <TabsTrigger value="body">Hair Products</TabsTrigger>
        <TabsTrigger value="body">Body & Wash Products</TabsTrigger>
      </TabsList>
      <TabsContent value="face">
        <FaceProductTable />
      </TabsContent>
      <TabsContent value="body">
        <BodyProductTable />
      </TabsContent>
    </Tabs>
  );
}
