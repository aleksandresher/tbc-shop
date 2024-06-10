// "use client";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// import FaceProductCreator from "../create/FaceProduct";
// import BodyProductCreator from "../create/BodyProduct";
// import { useState } from "react";
// import ProductCreator from "../create/ProductCreator";

// export default function ProductCategoryMenu() {
//   const [open, setOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState("face");
//   return (
//     <DropdownMenu open={open} onOpenChange={setOpen}>
//       <DropdownMenuTrigger onClick={() => setOpen(true)}>
//         Add product
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-full">
//         <DropdownMenuLabel>Product Categories</DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         <div className="p-4 bg-slate-100 w-full">
//           <Tabs
//             defaultValue="face"
//             className="w-full"
//             value={activeTab}
//             onValueChange={(value) => setActiveTab(value)}
//           >

//               {/* <FaceProductCreator /> */}
//               <ProductCreator />
//             </TabsContent>
//             <TabsContent value="body">
//               <BodyProductCreator />
//             </TabsContent>
//           </Tabs>
//         </div>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }
