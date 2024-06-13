"use client";
import Cart from "./Cart";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface CartHoverCardProps {
  handleClick: () => void;
  locale: string;
}

export default function CartHoverCard({
  handleClick,
  locale,
}: CartHoverCardProps) {
  return (
    <section>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Image
            src="/basket.svg"
            width={30}
            height={30}
            alt="cart icon"
            onClick={handleClick}
          />
        </HoverCardTrigger>
        <HoverCardContent className="w-80 bg-gray-200">
          <Cart locale={locale} />
        </HoverCardContent>
      </HoverCard>
    </section>
  );
}
