"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import FaceProductCreator from "../create/FaceProduct";
import BodyProductCreator from "../create/BodyProduct";
import { useState } from "react";

export default function ProductCategoryMenu() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("face");
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger onClick={() => setOpen(true)}>
        Add product
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Product Categories</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="p-4 bg-slate-100">
          <Tabs
            defaultValue="face"
            className="w-[800px]"
            value={activeTab}
            onValueChange={(value) => setActiveTab(value)}
          >
            <TabsList>
              <TabsTrigger value="face">Face</TabsTrigger>
              <TabsTrigger value="body">Body</TabsTrigger>
            </TabsList>
            <TabsContent value="face">
              <FaceProductCreator />
            </TabsContent>
            <TabsContent value="body">
              <BodyProductCreator />
            </TabsContent>
          </Tabs>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
