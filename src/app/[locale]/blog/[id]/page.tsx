import SingleBlogCard from "@/app/components/blogs/SingleBlogCard";
import { loadSingleBlog } from "@/services/func";
import { ResolvingMetadata, Metadata } from "next";
import { getAllBlog } from "@/services/func";
const URL = process.env.NEXT_PUBLIC_BASE_URL;

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  try {
    const response = await getAllBlog();

    if (!Array.isArray(response)) {
      throw new Error("Invalid response format: expected array of blogs");
    }

    console.log("Blogs fetched:", response);

    return response.map((blog: any) => ({
      id: blog.id.toString(),
    }));
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;

  const blog = await loadSingleBlog({ id });
  console.log("blog", blog[0]?.title);

  return {
    title: blog[0].title,
  };
}

export default function SingleBlogPage({ params }: { params: { id: string } }) {
  const { id } = params;
  return <SingleBlogCard id={id} />;
}
