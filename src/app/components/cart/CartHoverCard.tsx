"use client";
import Cart from "./Cart";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import BasketIcon from "../svg/BasketIcon";

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
        <HoverCardTrigger>
          <BasketIcon />
        </HoverCardTrigger>
        <HoverCardContent className="w-80 bg-gray-200">
          <Cart locale={locale} />
        </HoverCardContent>
      </HoverCard>
    </section>
  );
}
