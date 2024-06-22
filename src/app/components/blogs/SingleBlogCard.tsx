"use client";
import { loadSingleBlog } from "@/services/func";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function SingleBlogCard({
  id,
  locale,
}: {
  id: string;
  locale: string;
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["blog"],
    queryFn: () => loadSingleBlog({ id }),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  const renderParagraphs = (content: string) => {
    const paragraphs = content.split("\n");
    return paragraphs.map((paragraph, index) => (
      <p key={index} className="">
        {paragraph}
      </p>
    ));
  };

  function formatDate(isoString: string) {
    const date = new Date(isoString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  return (
    <section className="flex flex-col items-center mt-8 pb-8">
      <span className="flex w-full justify-center text-4xl font-mono">
        {data[0].title}
      </span>
      <div className="w-4/5 flex items-center gap-10 justify-center p-12 ">
        <Image
          src={data[0].image}
          width={500}
          height={500}
          alt={data[0].title}
          className="object-cover w-[500px] "
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) "
          priority={true}
        />
        <div className="flex flex-col gap-8 ">
          {renderParagraphs(data[0].content)}
        </div>
      </div>
      <div className="w-1/5 flex justify-between">
        <h2>{data[0].author}</h2>
        <p>{formatDate(data[0].created_at)}</p>
      </div>
    </section>
  );
}
