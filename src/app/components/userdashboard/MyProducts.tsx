"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MyProductList from "./MyProductList";
import MySearch from "./MySearch";
import { useState } from "react";

export default function MyProducts({ locale }: { locale: string }) {
  const [language, setLanguage] = useState(locale);
  function handleLanguageChange(value: string) {
    setLanguage(value);
  }

  return (
    <section>
      {" "}
      <Card>
        <CardHeader>
          <CardTitle>My products</CardTitle>
          <div className="flex gap-2">
            <button onClick={() => handleLanguageChange("ka")}>KA</button>
            <p>/</p>
            <button onClick={() => handleLanguageChange("en")}>EN</button>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <MySearch />
          <MyProductList locale={language} />
        </CardContent>
        {/* <CardFooter>
          <Button>Save changes</Button>
        </CardFooter> */}
      </Card>
    </section>
  );
}
