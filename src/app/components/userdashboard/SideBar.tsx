"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyProducts from "./MyProducts";
import AddMyProduct from "./AddProduct";
import { useState, useEffect } from "react";
import { useCart } from "@/app/providers/ContextProvider";

export default function UserSideBar() {
  const [active, setActive] = useState("addproduct");
  const { opened } = useCart();

  useEffect(() => {
    if (opened) {
      setActive("mycart");
    }
  }, [opened]);
  return (
    <Tabs
      onValueChange={(value) => setActive(value)}
      value={active}
      defaultValue="myproducts"
      className="w-full  flex justify-center gap-3"
    >
      <TabsList className="flex flex-col items-start px-6 py-8 gap-2 border border-gray-100 h-full shadow-xl bg-[#fff]">
        <TabsTrigger value="addproduct">
          <p
            className={`text-lg hover:text-[#418ea5] ${
              active === "addproduct" ? "text-[#fb8500]" : ""
            }`}
          >
            პროდუქტის დამატება
          </p>
        </TabsTrigger>
        <TabsTrigger value="myproducts" className="text-lg">
          <p
            className={`text-lg hover:text-[#418ea5] ${
              active === "myproducts" ? "text-[#fb8500]" : ""
            }`}
          >
            ჩემი განცხადებები
          </p>
        </TabsTrigger>
        <TabsTrigger value="mycart" className="text-lg">
          <p
            className={`text-lg hover:text-[#418ea5] ${
              active === "mycart" ? "text-[#fb8500]" : ""
            }`}
          >
            ჩემი კალათა
          </p>
        </TabsTrigger>
        <TabsTrigger value="myorders" className="text-lg">
          <p
            className={`text-lg hover:text-[#418ea5] ${
              active === "myorders" ? "text-[#fb8500]" : ""
            }`}
          >
            ჩემი შეკვეთები
          </p>
        </TabsTrigger>
        <TabsTrigger value="editaccount" className="text-lg">
          <p
            className={`text-lg hover:text-[#418ea5] ${
              active === "editaccount" ? "text-[#fb8500]" : ""
            }`}
          >
            ანგარიშის რედაქტირება
          </p>
        </TabsTrigger>
      </TabsList>
      <div className="w-full bg-[#fff]">
        <TabsContent value="myproducts" className="mt-0">
          <MyProducts />
        </TabsContent>
        <TabsContent value="addproduct">
          <AddMyProduct />
        </TabsContent>
      </div>
    </Tabs>
  );
}
