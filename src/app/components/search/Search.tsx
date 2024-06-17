"use client";
import Image from "next/image";
import { useI18n } from "@/app/locales/client";
import { useState } from "react";

interface SearchResult {
  title: string;
}
export default function Search() {
  const t = useI18n();
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  console.log("suggestions", suggestions);

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
      <ul>
        {suggestions?.map((suggestion, index) => (
          <li key={index}>
            <p> {suggestion?.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
