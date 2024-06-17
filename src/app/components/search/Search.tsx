"use client";
import Image from "next/image";
import { useI18n } from "@/app/locales/client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface SearchResult {
  title: string;
  image: string;
  id: string;
}
export default function Search() {
  const t = useI18n();
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const ulRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ulRef.current && !ulRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = async (e: any) => {
    try {
      const { value } = e.target;
      const response = await fetch("/api/search", {
        method: "POST",
        body: JSON.stringify({ query: value }),
      });
      const { results } = await response.json();
      setSuggestions(results);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <section className="flex flex-col gap-2 relative">
      <div className="relative h-[50px] sm:w-[250px] md:w-[400px] flex border border-gray-300 rounded-[30px] bg-gray-50 placeholder-gray-700 focus:border-green-600 outline-none p-2">
        <Image src="/search2.svg" width={30} height={30} alt="search icon" />
        <form className="flex w-full">
          <input
            type="text"
            placeholder={t("search")}
            className="block p-4 text-md text-gray-900 focus:outline-none"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              handleInputChange(e);
            }}
          />
        </form>
      </div>
      <ul
        className="flex flex-col  rounded-[10px] bg-gray-200 top-14 shadow-lg absolute z-10"
        ref={ulRef}
      >
        {suggestions?.map((suggestion, index) => (
          <Link href={`/shop/${suggestion.id}`} key={index}>
            <li
              key={index}
              className="flex items-center gap-2  p-4 px-8"
              // onClick={() => setSuggestions([])}
            >
              <p> {suggestion?.title}</p>
              <Image
                src={suggestion.image}
                alt={suggestion?.title}
                width={50}
                height={50}
              />
            </li>
          </Link>
        ))}
      </ul>
    </section>
  );
}
