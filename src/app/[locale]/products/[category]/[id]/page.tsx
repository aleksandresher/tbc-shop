// "use client";
// import { useParams } from "next/navigation";
// import { useQuery } from "@tanstack/react-query";
// import { loadProductsByCategory } from "@/services/func";
// // import GeneralCard from "@components/GeneralCard";
// import SingleProductCard from "@/app/components/products/card/SingleProductCard";
// import { loadSingle } from "@/services/func";

// export default function SingleProductPage() {
//   const params = useParams<{ id: string; category: string }>();
//   const { id, category } = params;
//   console.log("params", id, category);

//   const { data, isLoading, error } = useQuery({
//     queryKey: ["generic"],
//     queryFn: () => loadSingle({ category, id }),
//   });

//   return (
//     <section className="w-full flex justify-center px-12">
//       <h1>SIngle product page</h1>

//       <div className="w-11/12 flex gap-3">
//         {/* <div className="">
//           <SideBarSelector category={category} />
//         </div> */}
//         <div className="w-4/5 flex-grow">
//           <div className=" grid grid-cols-4 gap-4 ">
//             {data?.map((item: any) => {
//               return <SingleProductCard item={item} key={item.id} />;
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
