"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyProducts from "./MyProducts";
import AddMyProduct from "./AddProduct";
import { useState, useEffect } from "react";
import { useCart } from "@/app/providers/ContextProvider";
import MyInfoPage from "./MyInfo";
import Cart from "../cart/Cart";
import OrderList from "../order/OrdersList";
import { useI18n } from "@/app/locales/client";

export default function UserSideBar({ locale }: { locale: string }) {
  const t = useI18n();
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
      className="w-full  flex flex-col md:flex-row justify-center gap-3"
    >
      <TabsList className="flex flex-col items-start px-6 py-8 gap-2 border border-gray-100 h-full shadow-xl bg-[#fff] dark:bg-black">
        <TabsTrigger value="addproduct" className=" ">
          <p
            className={` cursor-pointer text-lg hover:text-[#418ea5] ${
              active === "addproduct" ? "text-[#fb8500]" : " "
            }`}
          >
            {t("addProduct")}
          </p>
        </TabsTrigger>
        <TabsTrigger value="myproducts" className="text-lg">
          <p
            className={` text-lg hover:text-[#418ea5] ${
              active === "myproducts" ? "text-[#fb8500]" : ""
            }`}
          >
            {t("myProducts")}
          </p>
        </TabsTrigger>
        <TabsTrigger value="mycart" className="text-lg">
          <p
            className={` text-lg hover:text-[#418ea5] ${
              active === "mycart" ? "text-[#fb8500]" : ""
            }`}
          >
            {t("myCart")}
          </p>
        </TabsTrigger>
        <TabsTrigger value="myorders" className="text-lg">
          <p
            className={` text-lg hover:text-[#418ea5] ${
              active === "myorders" ? "text-[#fb8500]" : ""
            }`}
          >
            {t("myOrders")}
          </p>
        </TabsTrigger>
        <TabsTrigger value="editaccount" className="text-lg">
          <p
            className={` text-lg hover:text-[#418ea5] ${
              active === "editaccount" ? "text-[#fb8500]" : ""
            }`}
          >
            {t("accountDetails")}
          </p>
        </TabsTrigger>
      </TabsList>
      <div className="w-full bg-[#fff] dark:bg-black">
        <TabsContent value="myproducts" className="mt-0">
          <MyProducts locale={locale} />
        </TabsContent>
        <TabsContent value="addproduct">
          <AddMyProduct />
        </TabsContent>
        <TabsContent value="editaccount">
          <MyInfoPage />
        </TabsContent>
        <TabsContent value="mycart" className="flex justify-center">
          <Cart locale={locale} />
        </TabsContent>
        <TabsContent value="myorders">
          <OrderList />
        </TabsContent>
      </div>
    </Tabs>
  );
}
