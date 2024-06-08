"use client";
import Image from "next/image";
import AddToCart from "../../cart/AddToCart";
import RateProduct from "../RateProduct";
import Link from "next/link";

interface Card {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
}

interface CardProps {
  item: Card;
}

export default function SingleProductCard({ item }: CardProps) {
  return (
    <section className="flex flex-col border border-gray-200 p-3">
      <h1>{item.title}</h1>
      <p>{item.price}</p>
      <p>{item.description}</p>
      <AddToCart productId={item.id} product_type={item.category} />
      <RateProduct productId={Number(item.id)} category={item.category} />
      <Link href={`products/${item.category}/${item.id}`}>View Product</Link>
      {/* <span className="border border-gray-400">
        {" "}
        <Image
          width={300}
          height={300}
          alt="image"
          src="https://res.cloudinary.com/dlku11fhn/image/upload/v1717839146/CustomShopifySize-103_ee0d2760-e4ad-4815-8b63-a59acb7e2a9c_600x_fgtw1c.webp"
        />
      </span>
      <span className="border border-gray-400">
        <Image
          width={300}
          height={300}
          alt="image"
          src="https://res.cloudinary.com/dlku11fhn/image/upload/v1717839136/Custom_Shopify_Size-245_400x_nwuk6d.webp"
        />
      </span> */}
      <a href="https://buy.stripe.com/test_eVag177L009le8EfYY">payment</a>
    </section>
  );
}
