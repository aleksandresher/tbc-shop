"use client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Image from "next/image";

export default function ImageHoverCard({
  image,
  title,
}: {
  image: string;
  title: string;
}) {
  return (
    <section className="sm:hidden">
      <HoverCard>
        <HoverCardTrigger>+</HoverCardTrigger>
        <HoverCardContent>
          <Image
            src={image}
            alt={title}
            width={300}
            height={300}
            className="w-300 h-300"
          />
        </HoverCardContent>
      </HoverCard>
    </section>
  );
}
