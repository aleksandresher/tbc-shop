"use client";
import { useState, useEffect } from "react";
import Fuse, { IFuseOptions } from "fuse.js";
import { useQuery } from "@tanstack/react-query";
import { getAllProduct } from "@/services/func";

interface SearchRecord {
  id: string;
  title: string;
  content: string;
}
// interface LanguageObject {
//   title: string;
//   category: string;
//   country: string;
//   brand: string;
//   sdescription: string;
//   ldescription: string;
//   price: number;
//   currency: string;
// }

// interface Product {
//   product_id: number;
//   languages: {
//     en: LanguageObject;
//     ka: LanguageObject;
//   };
// }

// interface DataType {
//   products: Product[];
// }

async function aggregateContext(): Promise<SearchRecord[]> {
  const { data, isLoading, error } = useQuery({
    queryKey: ["generic"],
    queryFn: () => getAllProduct(),
  });

  // Transform products into SearchRecord format
  const content: SearchRecord[] = data?.map((product: any) => ({
    id: product.product_id.toString(),
    title: product.languages.ka.title,
    content: product.languages.ka.ldescription,
  }));
  console.log("contenct", content);
  return content;
}

function createFuseInstance(content: SearchRecord[]) {
  // Create the fuse instance
  const options: IFuseOptions<SearchRecord> = {
    keys: ["content", "title"],
    useExtendedSearch: true,
    ignoreLocation: true,
    threshold: 0.3,
    fieldNormWeight: 2,
  };
  return new Fuse(content, options);
}

function Search({ fuse }: { fuse: Fuse<SearchRecord> }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchRecord[]>([]);

  useEffect(() => {
    if (query) {
      const searchResults = fuse.search(query);
      setResults(searchResults.map((result) => result.item));
    } else {
      setResults([]);
    }
  }, [query, fuse]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search for product"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 border rounded"
      />
      <ul className="border rounded bg-white mt-1">
        {results.map((result) => (
          <li key={result.id} className="p-2">
            {result.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SearchWrapper() {
  const [content, setContent] = useState<SearchRecord[]>([]);
  const [fuse, setFuse] = useState<Fuse<SearchRecord> | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const aggregatedContent = await aggregateContext();
      setContent(aggregatedContent);
      setFuse(createFuseInstance(aggregatedContent));
    };
    fetchData();
  }, []);

  if (!fuse) {
    return <div>Loading...</div>;
  }

  return <Search fuse={fuse} />;
}
