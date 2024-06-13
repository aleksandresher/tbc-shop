"use client";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface CartItem {
  cart_id: number;
  product_id: number;
  quantity: number;
  added_at: string;
  image: string;
  numberofvotes: number;
  totalvotes: number;
  size: string;
  languages: {
    en: LanguageDetails;
    ka: LanguageDetails;
  };
}

interface LanguageDetails {
  title: string;
  category: string;
  country: string;
  brand: string;
  sdescription: string;
  ldescription: string;
  price: string;
  currency: string;
}

interface CartHoverCardProps {
  locale: string;
  cartItem: CartItem;
}

export default function FullProductOnHover({
  cartItem,
  locale,
}: CartHoverCardProps) {
  const languageDetails =
    cartItem.languages[locale as keyof typeof cartItem.languages];

  return (
    <section>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Image src="/eye.svg" width={30} height={30} alt="eye icon" />
        </HoverCardTrigger>
        <HoverCardContent className="w-80 bg-gray-200 p-4">
          <h2 className="font-bold">{languageDetails.title}</h2>
          <p>{languageDetails.sdescription}</p>
          <p>{languageDetails.ldescription}</p>
          <p>
            Price: {languageDetails.price} {languageDetails.currency}
          </p>
        </HoverCardContent>
      </HoverCard>
    </section>
  );
}
