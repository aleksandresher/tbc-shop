"use client";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyProducts from "./MyProducts";
import AddMyProduct from "./AddProduct";

export default function UserSideBar() {
  return (
    <Tabs defaultValue="myproducts" className="w-full flex">
      <TabsList className="flex flex-col items-start px-6 py-4 gap-2 border border-gray-100 h-full">
        <TabsTrigger value="addproduct">
          <p className="text-lg hover:text-[#418ea5]">განცხადების დამატება</p>
        </TabsTrigger>
        <TabsTrigger value="myproducts" className="text-lg">
          <p className="text-lg hover:text-[#418ea5]">ჩემი განცხადებები</p>
        </TabsTrigger>
        <TabsTrigger value="mycart" className="text-lg">
          <p className="text-lg hover:text-[#418ea5]">ჩემი კალათა</p>
        </TabsTrigger>
        <TabsTrigger value="myorders" className="text-lg">
          <p className="text-lg hover:text-[#418ea5]">ჩემი შეკვეთები</p>
        </TabsTrigger>
        <TabsTrigger value="editaccount" className="text-lg">
          <p className="text-lg hover:text-[#418ea5]">ანგარიშის რედაქტირება</p>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="myproducts" className="w-full">
        <MyProducts />
      </TabsContent>
      <TabsContent value="addproduct">
        <AddMyProduct />
      </TabsContent>
    </Tabs>
  );
}
